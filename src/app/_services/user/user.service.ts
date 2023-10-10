import {Injectable, signal} from '@angular/core';
import {User} from "../auth/auth-service.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = signal<User>({} as User);

  constructor() { }
}
