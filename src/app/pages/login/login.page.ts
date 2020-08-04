import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'
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
    
  }

  async login() {
    const loadingIndicator = await this.showLoadingIndicator();
    await this.authenticationService.login();
    loadingIndicator.dismiss();
  }

  private async showLoadingIndicator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window....'
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
