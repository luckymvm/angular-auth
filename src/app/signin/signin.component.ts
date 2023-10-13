import {Component, inject, OnDestroy} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {
  authService = inject(AuthService);

  credentials = {
    username: '',
    password: '',
  }

  ngOnDestroy() {
    this.authService.errors.mutate(value => value.logIn = '');
  }
}
