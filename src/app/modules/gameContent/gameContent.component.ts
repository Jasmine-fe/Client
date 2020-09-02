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
    const user: User = this.userService.getUserInfo();
    const payload = {
      gameId: this.currentGame.gameId,
      excuteMode: this.currentGame.excuteMode,
      configfile: this.currentGame.configFile,
      action:"" //action: start, continue, end
    };

    const userInfo = this.gameServerService.getUserInfo();
    console.log("connectServer userInfo", userInfo)
    let payloadIP = {
      username: userInfo.username,
      gamename: this.currentGame.name,
      ip: "",
      status: "",
    };

    const serverInfo: GameServer = this.gameServerService.getServerInfo();
    if (serverInfo && serverInfo.gameIP) {
      Android.opengame(serverInfo.gameIP);
    } else {
      payload.action = "start";
      console.log(" connectServer payload", payload)
      this.GameService.connectToGameServer(payload)
        .subscribe((res: any) => {
          payloadIP.ip = res.gameIP;
          payloadIP.status = res.gamestatus;
          this.gameServerService.setServerInfo(res)
          console.log("connectServer payloadIP", payloadIP)

          this.connectService.recordGameServerIp(payloadIP)
            .subscribe((res: any) => {
              Android.opengame(payloadIP.ip);
            })
        })
    }
  }

  

}