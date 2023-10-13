import {Component, inject, OnDestroy} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  authService = inject(AuthService);

  credentials = {
    email: '',
    username: '',
    password: '',
  }

  ngOnDestroy() {
    this.authService.errors.mutate(value => value.register = '');
  }
}
