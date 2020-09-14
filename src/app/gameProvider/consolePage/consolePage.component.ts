import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '../../services/provider.service';
import { ConnectService } from '../../services/connect.service';
import { GameService } from '../../services/game.service';
import { notificationSetting } from '../../shared/common';
import { parseJwt } from '../../shared/common'

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

  endPayload = {
    ip: "",
    excuteMode: "",
    pid: "" 
  }
  options: any = notificationSetting;


  ngOnInit() {
    // get username from jwtToken
    const jwtToken = localStorage.getItem('currentUser')
    const parseInfo =  parseJwt(jwtToken);

    const payload = { username: parseInfo.username };
    this.gameService.getProcessingGameInfo(payload)
    .subscribe((res) => {
      if(res && res.data && res.data) {
        const { progressingInfo, gameInfo } = res.data;
        this.data.current.progressingInfo = progressingInfo;
        this.data.current.gameInfo = gameInfo;
        this.endPayload = {
          ip: progressingInfo.serverIp,
          pid: progressingInfo.pid,
          excuteMode: gameInfo.excuteMode,
        }
      } else {
        this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);
      }
    })

  }

  endGame() {
    this.connectService.endGame(this.endPayload)
      .subscribe(res => {
        if (res && res.status) {
          const { serverIp, pid } = this.data.current.progressingInfo;
          const payload = {
            ip: serverIp,
            pid: pid,
            status: 'FALSE'
          }
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
}
