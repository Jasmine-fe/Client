import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL } from '../shared/common';

@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  
  providerUrl=`${webServerURL}/provider`;

  uploadFile(payload) {
    let headers = new HttpHeaders();
    return this.http.post(`${this.providerUrl}`, payload);
  }


}
