import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { UserData } from 'src/app/providers/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;

  constructor(private authenticationService: AuthenticationService, private userData: UserData) { }

  async ngOnInit() {
    let isLoggedIn = await this.userData.isLoggedIn();
    if (isLoggedIn) {
      this.user =  {
        username : await this.userData.getUsername(),
        avatar: 'assets/user-placeholder.jpg'
      }

      console.log(this.user);
    }
    else {
      this.user = null;
    }
  }

  async gotoJV() {
    console.error('Goto JV clicked');
    this.authenticationService.logout();
  }
}
