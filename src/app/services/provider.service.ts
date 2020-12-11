import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GameList } from '../interface/game.interface';
import { webServerURL, brokerServerURL } from '../shared/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProviderService {
  constructor(private http: HttpClient) { }

  // aws EC2 instance public DNS
  
  providerUrl=`${webServerURL}/provider`;

  createNewGame(payload) {
    console.log("createNewGame", payload)
    return this.http.post<any>(`${this.providerUrl}/game`, payload);
  }

  uploadZip(payload, gameName) {
    return this.http.post<any>(`${brokerServerURL}/Add?gamename=${gameName}`, payload);
  }

  uploadImg(payload) {
    return this.http.post<any>(`${this.providerUrl}/image?gameName=${payload.gameName}`, payload.formData);
  }

  getImgFile(payload){
    return this.http.get<any>(`${this.providerUrl}/image?gameName=${payload.gameName}`)
  }
}
