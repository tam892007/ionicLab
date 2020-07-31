import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService,
              private loadingController: LoadingController) { }

  async ngOnInit() {
    // Web only: If redirected back to app after login and using implicitLogin = 'CURRENT' (current window),
    // pass along the auth details, such as access token, to Auth Connect
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndicator();
      try {
        // Once handleCallback complete, Auth Connect calls onLoginSuccess in Authentication service
        await this.authenticationService.handleCallback(window.location.href);
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async login() {
    const loadingIndicator = await this.showLoadingIndicator();
    try {
      await this.authenticationService.login();
    } catch (e) {
      console.log(`caught error ${e.message}`);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndicator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window....'
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
