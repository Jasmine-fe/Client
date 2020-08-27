import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  loginUrl=`${webServerURL}/login`;

  checkLogin(payload) {
    return this.http.get(`${this.loginUrl}`, payload);
  }


}
