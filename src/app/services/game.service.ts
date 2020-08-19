import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GameList } from '../interface/game.interface';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  gameUrl='http://54.146.78.28:3000/game';

  getGameList() {
    return this.http.get<any>(`${this.gameUrl}`);
  }

  getGameContent(payload) {
    return this.http.get<any>(`${this.gameUrl}/content?providerId=${payload.providerId}&gameId=${payload.gameId}`);
  }

  connectToGameServer(payload) {
    console.log("payload", payload)

    // modify server url
    return this.http.get<any>(`http://192.168.137.3:5000/TEST?gameId=${payload.gameId}&providerId=${payload.providerId}&configfile=${payload.configfile}`);
  }

  updateGameServer(payload) {
    return this.http.get<any>(`${this.gameUrl}/gameServer?gameServerIp=${payload.gameServerIp}&status=${payload.status}`);
  }

}
