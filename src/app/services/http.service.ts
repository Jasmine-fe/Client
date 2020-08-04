import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../interface/game.interface';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  gameUrl='http://localhost:3000';

  getGameList() {
    return this.http.get<any>(`${this.gameUrl}/game`);
  }
}
