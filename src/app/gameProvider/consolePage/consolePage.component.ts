import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '../../services/provider.service';
import { ConnectService } from '../../services/connect.service';
import { GameService } from '../../services/game.service';
import { notificationSetting } from '../../shared/common';
import { parseJwt } from '../../shared/common'
import * as dateFormat from 'dateformat';

@Component({
  selector: 'app-console-page',
  templateUrl: './consolePage.component.html',
  styleUrls: ['./consolePage.component.css']
})
export class ConsolePageComponent implements OnInit {
  constructor(
    public gameService: GameService,
    public connectService: ConnectService,
    private matSnackBar: MatSnackBar) { }

  data = {
    current: {
      progressingInfo: {
        idconnection: 0,
        username: "",
        gamename: "",
        serverIp: "",
        status: "",
        lstUpdateTime: "",
        pid: "",
        gameId: ""
      },
      gameInfo: {
        id: 0,
        name: "",
        imageUrl: "",
        descp: "",
        providerId: "",
        lastUpdateTime: "",
        gameId: "",
        configFile: "",
        excuteMode: "",
        filename: ""
      }
    },
    player: {
      currentPlayer: 3,
      dailyPlayer: 5,
      weeklyPlayer: 100,
      monthlyPlayer: 392,
    }
  };

  options: any = notificationSetting;
  progressingGameList: any[];

  ngOnInit() {
    // get username from jwtToken
    // const jwtToken = localStorage.getItem('currentUser')
    // const parseInfo =  parseJwt(jwtToken);
    this.gameService.getProcessingGames()
      .subscribe((res) => {
        if (res && res.data && res.data.processingGames.length) {
          this.progressingGameList = res.data.processingGames;
        }
        else if(res && res.data && res.data.processingGames.length == 0){
          this.matSnackBar.open("目前無進行中的遊戲可觀看", 'empty', this.options);
        }
        else {
          this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);
        }
      })

  }

  endGame(game) {
    const { serverIp, excuteMode, pid } = game;
    const payload = { excuteMode, pid, ip: serverIp }
    this.connectService.endGame(payload)
      .subscribe(res => {
        if (res && res.status) {
          this.connectService.updateConnectStatus(payload)
            .subscribe(res => {
              this.matSnackBar.open("成功結束遊戲", 'success', this.options);
            })
        }
        else {
          this.matSnackBar.open("結束遊戲失敗", 'fail', this.options);
        }
      })
  }

  formatTime(time) {
    const formatTime = dateFormat(time, "yyyy-mm-dd hh:mm:ss");
    return formatTime;
  }

}
