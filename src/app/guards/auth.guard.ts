import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authentication: AuthenticationService,
              private navCtrl: NavController) {
  }

  async canActivate(): Promise<boolean> {
    //use MSAL Guard 
    return true;
  }
}
