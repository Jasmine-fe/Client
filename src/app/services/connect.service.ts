import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';


@Injectable()
export class ConnectService {
  constructor(private http: HttpClient) { }

  connectUrl=`${webServerURL}`;

  endGame(payload) {
    return this.http.get(`http://192.168.137.183:5000/End?configfile=${payload.configfile}&ip=${payload.ip}`);
  }


}