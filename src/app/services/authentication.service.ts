import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { isIE, b2cPolicies } from 'src/app/configs/azureB2C';
import { UserData } from 'src/app/providers/user-data'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Emit event when login status changes
  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  constructor(private broadcastService: BroadcastService, private authService: MsalService, private userData: UserData) 
  {
    this.subscribeMsalEvents();
  }

  subscribeMsalEvents() {
    // redirect callback for redirect flow (IE)
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    // event listeners for authentication status
    this.broadcastService.subscribe('msal:loginSuccess', (success) => {
      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        if (success.idToken.claims['tfp'] !== b2cPolicies.names.signUpSignIn) {
          window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
          return this.logout();
        }

        console.log('login succeeded. id token acquired at: ' + new Date().toString());
        console.log(success);
        this.checkAccount();
    });

    this.broadcastService.subscribe('msal:loginFailure', (error) => {
      console.log('login failed');
      console.log(error);

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          if (isIE) {
            this.authService.loginRedirect(b2cPolicies.authorities.resetPassword);
          } else {
            this.authService.loginPopup(b2cPolicies.authorities.resetPassword);
          }
        }
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  // other methods
  checkAccount() {
    let acc = this.authService.getAccount();
    console.log(acc);
    if (!!acc) {
      this.userData.login(acc.name);
    }
  }

  async login() : Promise<any> {
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      try {
        return await this.authService.loginPopup();
      } 
      catch (error) {
        if (error.errorMessage) {
          // Check for forgot password error
          // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (error.errorMessage.indexOf("AADB2C90118") > -1) {
            return this.authService.loginPopup(b2cPolicies.authorities.resetPassword);
          }
        }
      }
    }
  }

  async logout() : Promise<any> {
    this.authService.logout()
    return this.userData.logout();
  }
}
