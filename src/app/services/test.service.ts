import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../interface/game.interface';


 
@Injectable()
export class TestService {
  constructor(private http: HttpClient) { }

  gameUrl='http://localhost:3000/game';

  getGameList() {
    return this.http.get<any>(`${this.gameUrl}`);
  }


  getGameContent(payload) {
    return this.http.get<any>(`${this.gameUrl}/content?providerId=${payload.providerId}&gameId=${payload.gameId}`, );
  }

}