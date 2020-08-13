import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    username = ""
    password = ""

    setUserInfo (username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    getUserInfo () {
        return  { username: this.username, password: this.password };
    }

}