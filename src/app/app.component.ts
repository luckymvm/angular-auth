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
    private auth: AuthService,
    private user: UserService,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.storage.getBrowserId()) {
      const browserId = generateRandomString(10);
      this.storage.setBrowserId(browserId);
    }

    this.auth.refresh().subscribe({
      next: (data: any) => {
        this.auth.status.set('authenticated');
        this.auth.accessToken.set(data.accessToken);
        this.user.user.set({username: data.username, email: data.email});

        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.auth.status.set('unauthenticated');

        this.router.navigate(['/signin'])
      }
    });
  }
}
