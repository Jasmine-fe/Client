import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  gameUrl=`${webServerURL}/game`;
  ;

  getGameList() {
    return this.http.get<any>(`${this.gameUrl}/list`,  { observe: 'response' });
  }

  getGameContent(payload) {
    return this.http.get<any>(`${this.gameUrl}/content?providerId=${payload.providerId}&gameId=${payload.gameId}`);
  }

  // send request to broker server
  connectToGameServer(payload) {
    return this.http.get<any>(`http://192.168.43.196:5000/IP?gameId=${payload.gameId}&providerId=${payload.providerId}&configfile=${payload.configfile}&excuteMode=${payload.excuteMode}`);
  }

  getProcessingGames() {
    return this.http.get<any>(`${this.gameUrl}/progress/list`);
  }

  getProcessingGameIp(payload) {
    return this.http.get<any>(`${this.gameUrl}/progress/ip?gameId=${payload.gameId}`);
  }

  getProcessingGameInfo(payload) {
    return this.http.get<any>(`${this.gameUrl}/progress/info?username=${payload.username}`);
  }

}
