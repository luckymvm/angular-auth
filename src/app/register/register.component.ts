import {Component, inject} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  credentials = {
    email: '',
    username: '',
    password: '',
  }

  authService = inject(AuthService);

}
