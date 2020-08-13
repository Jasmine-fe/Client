import { Injectable } from '@angular/core';
import { GameServer } from '../interface/game.interface'
import { from } from 'rxjs';
@Injectable({
    providedIn: 'root',
  })
export class GameServerService {
    serverInfo: GameServer;

    setServerInfo (payload: any) {
        this.serverInfo.gameStatue = payload.gameStatue;
        this.serverInfo.ip = payload.ip;
    }

    getServerInfo () {
        return  this.serverInfo;
    }

}