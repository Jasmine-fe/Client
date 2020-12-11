import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL, brokerServerURL } from '../shared/common';


@Injectable()
export class ConnectService {
  constructor(private http: HttpClient) { }

  // record ip into DB
  recordGameServerIp(payload) {
    return this.http.post<any>(`${webServerURL}/connection/recordip`, payload);
  }

  endGame(payload) {
    return this.http.get(`${brokerServerURL}/End?serverIp=${payload.ip}&excuteMode=${payload.excuteMode}&pid=${payload.pid}`,  { observe: 'response' });
  }

  updateConnectStatus(payload) {
    return this.http.post<any>(`${webServerURL}/connection/status`, payload);
  }


}