import {Component, inject} from '@angular/core';
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  authService =  inject(AuthService);
}
