import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { GameServerService } from '../../services/gameServer.service';
import { ConnectService } from '../../services/connect.service';

import { GameServer } from '../../interface/game.interface'

@Component({
  selector: 'app-console-page',
  templateUrl: './consolePage.component.html',
  styleUrls: ['./consolePage.component.css']
})
export class ConsolePageComponent implements OnInit {
  constructor(public gameServerService: GameServerService,
    public connectService: ConnectService) { }

  data = {
    current: {
      name: "app-config-page",
      imageURL: "https://img.onl/6fFHHu",
      id: "",
      ip: "",
      configFile: "server.FPS_Game.config",
      filename: ""
    },
    player: {
      currentPlayer: 3,
      dailyPlayer: 5,
      weeklyPlayer: 100,
      monthlyPlayer: 392,

    }
  };
 


  ngOnInit() {
    const serverInfo: GameServer = this.gameServerService.getServerInfo();
    this.data.current.ip = serverInfo ?  serverInfo.gameIP: "192.168.43.196";
    console.log("this.data.current.ip", this.data.current.ip)
  }

  endGame() {
    const payload = {
      configfile: this.data.current.configFile,
      ip: this.data.current.ip || "192.168.43.196",
      filename: ""
    }
    this.connectService.endGame(payload)
    .subscribe(res => {
      console.log("endGame", res);
    })
  }

}
