import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { ConnectService } from '../../services/connect.service';
import { GameServerService } from '../../services/gameServer.service';
import { GameList, GameProvider, GameServer } from '../../interface/game.interface'
import { User } from '../../interface/user.interface'

interface AndroidInterface {
  opengame(ip: string): any;
  endGame(ip: string): any;
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
    private gameServerService: GameServerService) { }

  currentProvider: GameProvider;
  currentGame: GameList;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameId = params['gameId']
      const providerId = params['providerId']
      const payload = { gameId, providerId }
      this.GameService.getGameContent(payload)
        .subscribe((res: any) => {
          this.currentGame = res.data.game
          this.currentProvider = res.data.provider
        })
    })
  }

  connectServer() {
    const userInfo: User = this.userService.getUserInfo();
    const serverInfo: GameServer = this.gameServerService.getServerInfo();
    console.log("connectServer user", userInfo)
    console.log("connectServer serverInfo", serverInfo)
    const payload = {
      gameId: this.currentGame.gameId,
      excuteMode: this.currentGame.excuteMode,
      configfile: this.currentGame.configFile,
      action:"start" //action: start, continue, end
    };

    let payloadIP = {
      username: userInfo.username,
      gamename: this.currentGame.name,
      ip: "",
      status: "",
      // pid: "",
    };

    if (serverInfo && serverInfo.gameIP) {
      Android.opengame(serverInfo.gameIP);
    } 
    else {
      payload.action = "start";
      console.log(" connectServer payload", payload)
      this.GameService.connectToGameServer(payload)
        .subscribe((res: any) => {
          payloadIP.ip = res.gameIP;
          payloadIP.status = res.gamestatus;
          // payloadIP.pid = res.pid || '';
          this.gameServerService.setServerInfo(res)
          this.connectService.recordGameServerIp(payloadIP)
            .subscribe((res: any) => {
              Android.opengame(payloadIP.ip);
            })
        })
    }
  }

  // myWebView.loadUrl("javascript:endGame('192.168.43.196')");
  endGame(ip: string) {
    const payload = {
      configfile: "server.FPS_Game.config",
      ip: ip || "192.168.43.196"
    }
    // console.log("end game payload", payload)
    this.connectService.endGame(payload)
    .subscribe(res => {
      console.log("endGame", res);
    })
  }

}