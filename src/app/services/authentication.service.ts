import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Emit event when login status changes
  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  constructor() { }

  async login(): Promise<void> {
    try {
      // TODO
    } catch (error) {
      console.log('login error:', + error)
    }
  }

  onLoginSuccess() {
    this._loginStatusChanged.next(true);
  }

  onLogout()  {
    this._loginStatusChanged.next(false);
  }

  async getUserInfo() {
    const  idToken = await this.getIdToken();
    if (!idToken) {
      return
    }

    let email = idToken.email;
    if (idToken.emails instanceof Array) {
      email = idToken.emails[0]
    }

    return {
      id: idToken.sub,
      email: email,
      firstName: idToken.given_name,
      lastName: idToken.family_name,
      picture: "assets/user-placeholder.jpg"
    }
  }

  async getIdToken(): Promise<any> {
    //TODO
  }

  async logout() {
    // TODO
  }

  async isAuthenticated(): Promise<boolean> {
    // TODO
    return false;
  }

  async handleCallback(href: string) {
    // TODO
  }
}
