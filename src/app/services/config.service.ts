import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  connectUrl=`${webServerURL}/config`;

  getConfigTemplate() {
    return this.http.get(`${this.connectUrl}/template`)
  }
  


}