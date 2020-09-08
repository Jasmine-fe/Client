import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL, saltRounds } from '../shared/common';
import { User } from '../interface/user.interface';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  register(payload: any) {
    return this.http.post<any>(`${webServerURL}/user/register`, payload, { observe: 'response' })
}
}
