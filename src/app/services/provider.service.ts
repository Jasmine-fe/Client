import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';

@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  gameUrl='http://localhost:3000/game';

  uploadFile(payload) {
    let headers = new HttpHeaders();
    return this.http.post(`http://localhost:3000/provider`, payload);
  }


}
