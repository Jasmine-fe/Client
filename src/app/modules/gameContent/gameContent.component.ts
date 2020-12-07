import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { ConnectService } from '../../services/connect.service';
import { GameServerService } from '../../services/gameServer.service';
import { GameList, GameProvider, GameServer } from '../../interface/game.interface'
import { User } from '../../interface/user.interface'
import { MatSnackBar } from '@angular/material/snack-bar';
import { notificationSetting } from '../../shared/common';

interface AndroidInterface {
  opengame(ip: string): any;
  endGame(ip: string): any;
  viewGame(ip: string): any;
}
declare var Android: AndroidInterface;

@Component({
  selector: 'app-gameContent',
  templateUrl: './gameContent.component.html',
  styleUrls: ['./gameContent.component.css']
})
export class GameContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private GameService: GameService,
    private userService: UserService,
    private connectService: ConnectService,
    private gameServerService: GameServerService,
    private matSnackBar: MatSnackBar) { }

  currentProvider: GameProvider;
  currentGame: GameList;
  state = '';
  options: any = notificationSetting;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.state = params['state']
      const gameId = params['gameId']
      const providerId = params['providerId']
      const payload = { gameId, providerId }
      
      this.GameService.getGameContent(payload)
        .subscribe((res: any) => {
          if(res && res.data && res.data.game ) {
            this.currentGame = res.data.game
            this.currentProvider = res.data.provider
          }
          else {
            this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);      
          }
          
        })
    })
  }

  connectServer() {
    const userInfo: User = this.userService.getUserInfo();
    const serverInfo: GameServer = this.gameServerService.getServerInfo();
    const payload = {
      gameId: this.currentGame.gameId,
      excuteMode: this.currentGame.excuteMode,
      configfile: this.currentGame.configFile,
      action:"start",  //action: start, continue, end,
    };

    let payloadIP = {
      username: userInfo.username,
      gamename: this.currentGame.name,
      gameId: this.currentGame.gameId,
      ip: "",
      status: "",
      pid: "",
    };

    // if (serverInfo && serverInfo.gameIP) {
    //   Android.opengame(serverInfo.gameIP);
    // }
    // else {
      payload.action = "start";
      this.GameService.connectToGameServer(payload)
        .subscribe((res: any) => {
          
          if (res && res.gameIP) {
            payloadIP.ip = res.gameIP;
            payloadIP.status = res.gamestatus;
            payloadIP.pid = res.PID || '';
            this.gameServerService.setServerInfo(res)
            this.connectService.recordGameServerIp(payloadIP)
              .subscribe((res: any) => {
                Android.opengame(payloadIP.ip);
              })
          }
          else {
            this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);
          }
        })
    // }
  }

  viewGame() {
    const payload = { gameId: this.currentGame.gameId }
    this.GameService.getProcessingGameIp(payload)
      .subscribe((res: any) => {
        if (res && res.data && res.data.processingGame && res.data.processingGame.serverIp) {
          const ip: string = res.data.processingGame.serverIp;
          Android.viewGame(ip);
        } 
        else if (res && res.data) {
          this.matSnackBar.open("目前無進行中的遊戲可觀看", 'empty', this.options);  
        }
        else {
          this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);      
        }
      })
  }

  // myWebView.loadUrl("javascript:endGame('192.168.43.196')");
  endGame(ip: string) {
    const payload = {
      configfile: "server.FPS_Game.config",
      ip: ip || "192.168.43.196",
      filename: ""
    }
    this.connectService.endGame(payload)
      .subscribe(res => {
        if (res && res.status) {
          this.matSnackBar.open("成功結束遊戲", 'success', this.options);
        }
        else {
          this.matSnackBar.open("結束遊戲失敗", 'fail', this.options);
        }
      })
  }

}