import {Component, OnInit } from '@angular/core';
import {generateRandomString} from "./_helpers/generateRandomString";
import {StorageService} from "./_services/storage/storage.service";
import {AuthService} from "./_services/auth/auth.service";
import {UserService} from "./_services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.storage.getBrowserId()) {
      const browserId = generateRandomString(10);
      this.storage.setBrowserId(browserId);
    }

    this.authService.refresh().subscribe({
      next: (data: any) => {
        this.authService.status.set('authenticated');
        this.authService.accessToken.set(data.accessToken);
        this.userService.user.set({username: data.username, email: data.email});
      },
      error: () => {
        this.authService.status.set('unauthenticated');
        this.router.navigate(['/signin'])
      }
    });
  }
}
