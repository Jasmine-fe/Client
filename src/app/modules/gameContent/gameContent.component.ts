import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameList, GameProvider } from '../../interface/game.interface'
@Component({
  selector: 'app-gameContent',
  templateUrl: './gameContent.component.html',
  styleUrls: ['./gameContent.component.css']
})
export class GameContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private GameService: GameService) {}

  currentProvider: GameProvider;
  currentGame: GameList;

  ngOnInit() {
      this.route.params.subscribe(params => {
      const gameId = Number.parseInt(params['gameId']);
      const providerId = Number.parseInt(params['providerId']);
      const payload = { gameId, providerId }
      this.GameService.getGameContent(payload)
      .subscribe((res: any) => {
        this.currentGame = res.data.game
        this.currentProvider = res.data.provider
      })

   })
  }

}
