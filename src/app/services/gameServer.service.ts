import { Injectable } from '@angular/core';
import { GameServer } from '../interface/game.interface'
import { from } from 'rxjs';
@Injectable({
    providedIn: 'root',
  })
export class GameServerService {
    serverInfo: GameServer = {
        gamestatus: "",
        gameIP: ""
    };

    userInfo = {
        username: ""
    }

    setServerInfo (payload: any) {
        this.serverInfo.gamestatus = payload.gamestatus;
        this.serverInfo.gameIP = payload.gameIP;
    }

    getServerInfo () {
        return  this.serverInfo;
    }

    setUserInfo (payload: any) {
        this.userInfo.username = payload.username;
    }

    getUserInfo () {
        return  this.userInfo;
    }



}