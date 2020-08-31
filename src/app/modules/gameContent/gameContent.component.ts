import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
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
      providerId: this.currentGame.providerId,
      configfile: this.currentGame.configFile,
    }

    const userInfo = this.gameServerService.getUserInfo();
    console.log(" connectServer userInfo", userInfo)
    let payloadIP = {
      username: userInfo.username,
      gamename: this.currentGame.name,
      ip: "",
      status: "",
    };

    console.log(" connectServer payloadIP", payloadIP)
    this.GameService.connectToGameServer(payload)
      .subscribe((res: any) => {
        payloadIP.ip = res.gameIP;
        payloadIP.status = res.gamestatus;
        this.gameServerService.setServerInfo(res)

        this.GameService.recordGameServerIp(payloadIP)
          .subscribe((res: any) => {
            Android.opengame(payloadIP.ip);
          })

      })
  }

}