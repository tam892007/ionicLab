import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;

  constructor(private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    this.user = await this.authenticationService.getUserInfo()
  }

  async gotoJV() {
    console.error('Goto JV clicked');
    //await this.authenticationService.logout();
  }
}
