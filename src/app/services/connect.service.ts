import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';


@Injectable()
export class ConnectService {
  constructor(private http: HttpClient) { }

  connectUrl=`${webServerURL}`;

  // record ip into DB
  recordGameServerIp(payload) {
    return this.http.post<any>(`${this.connectUrl}/ip/recordip`, payload);
  }

  endGame(payload) {
    console.log("payload",payload)
    return this.http.get(`http://192.168.43.196:5000/End?ip=${payload.ip}&excuteMode=${payload.excuteMode}&pid=${payload.pid}`);
  }


}