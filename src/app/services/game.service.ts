import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GameList } from '../interface/game.interface';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) { }

  gameUrl='http://localhost:3000/game';

  getGameList() {
    return this.http.get<any>(`${this.gameUrl}`);
  }

  getGameContent(payload) {
    return this.http.get<any>(`${this.gameUrl}/content?providerId=${payload.providerId}&gameId=${payload.gameId}`);
  }

  connectToGameServer(payload) {
    console.log("payload", payload)
    const params = new HttpParams(payload);
    // modify server url
    return this.http.request('GET', this.gameUrl , {responseType:'json', params});
  }

}
