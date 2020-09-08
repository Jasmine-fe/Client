import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private GameService: GameService,
    private router: Router) { }
  gameList = []
  progressingGameList = [];

  ngOnInit() {
    this.GameService.getGameList()
    .subscribe((res) => {
      this.gameList = res.data
      
    })

    this.GameService.getProcessingGames()
    .subscribe((res) => {
      if(res && res.data && res.data.processingGames) {
        this.progressingGameList = res.data.processingGames
      }
    })
  }

  
  goContent() {
  }

  

}
