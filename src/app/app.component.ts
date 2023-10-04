import { Component, OnInit } from '@angular/core';
import {generateRandomString} from "./_helpers/generateRandomString";
import {StorageService} from "./_services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-auth';
  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    const browserId = this.storage.getBrowserId();
    if (!browserId) {
      const newBrowserId = this.generateBrowserId();
      return this.storage.setBrowserId(newBrowserId);
    }
    return;
  }

  generateBrowserId() {
    return generateRandomString(10);
  }
}
