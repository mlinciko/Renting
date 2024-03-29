import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    auth: AuthService, 
    user: UserService
  ) {
    auth.initializeToken();
    console.log(auth.accessToken.value)
    auth.accessToken.subscribe(
      () => {
        console.log("token")
        user.initializeUser();
      }
    )
  }
}
