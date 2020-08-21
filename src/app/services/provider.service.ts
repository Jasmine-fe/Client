import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';

@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  gameUrl='http://54.146.78.28:3000/game';

  uploadFile(payload) {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/octet-stream');
    let options = { headers };
    return this.http.post(`http://1.2.2.2:5000/`, payload, options);
  }


}
