import {Component, inject} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  credentials = {
    username: '',
    password: '',
  }

  authService = inject(AuthService);
}
