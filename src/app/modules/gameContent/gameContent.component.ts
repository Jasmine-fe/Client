import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { GameServerService } from '../../services/gameServer.service';
// import { AndroidInterface } from '../../interface/android.interface'
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
      // username: user.username,
      // password: user.password,
      gameId: this.currentGame.gameId,
      providerId: this.currentGame.providerId,
      configfile: "server.neverball.conf" //modify
      // lastUpdateTime: this.currentGame.lastUpdateTime,
    }

    this.GameService.updateGameServer(payload)
      .subscribe((res: any) => {
        console.log("update success")

        this.GameService.connectToGameServer(payload)
          .subscribe((res: any) => {
            this.gameServerService.setServerInfo(res)

            const payloadIP = {
              gameServerIp: res.gameIP,
              status: res.gamestatus
            };

            this.GameService.updateGameServer(payloadIP)
              .subscribe((res: any) => {
                console.log("update success")
                Android.opengame(res.gameIP);
              })

          })
      })
  }

}