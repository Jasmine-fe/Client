import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    console.log("isAuthenticated")
    const token = localStorage.getItem('currentUser');
    // Check whether the token is expired and return
    // true or false
    return token? true: false;
  }
}