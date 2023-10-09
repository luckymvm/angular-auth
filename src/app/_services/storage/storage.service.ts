import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getBrowserId() {
    return window.localStorage.getItem('browserId');
  }

  setBrowserId(browserId: string) {
    return window.localStorage.setItem('browserId', browserId);
  }
}
