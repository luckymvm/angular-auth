import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";
import {UserService} from "../_services/user/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  authService =  inject(AuthService);
  userService = inject(UserService);

  ngOnInit() {
  }
}
