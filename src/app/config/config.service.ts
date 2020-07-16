import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../interface/user.interface';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  userUrl='http://localhost:3000/users';

  getUser() {
    return this.http.get<User>(this.userUrl);
  }

  newUser(payload: User) {
    return this.http.post<any>(this.userUrl, payload );
  }
}
