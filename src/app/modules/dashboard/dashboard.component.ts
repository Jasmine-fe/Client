import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ProviderService } from '../../services/provider.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { notificationSetting } from '../../shared/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public providerService: ProviderService) { }

  gameList = []
  progressingGameList = [];
  options: any = notificationSetting;
  
  ngOnInit() {
    this.gameService.getGameList()
    .subscribe((res) => {
      if(res && res.status == 200) {
        this.gameList = res.body.data
        this.getImage(this.gameList)
      }
      else {
        this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options);      
      }
    })
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

  async getImage(gameList) {
    for await (let game of gameList) {
      const payload = { gameName: game.name };
      this.providerService.getImgFile(payload)
        .subscribe(res => {
          const blobImg = atob(res.data);
          var array = new Uint8Array(blobImg.length)
          for (var j = 0; j < blobImg.length; j++) { array[j] = blobImg.charCodeAt(j) }
          const img = new Blob([array]);
          const id = `game${game.gameId}`
          let imgDOM = document.getElementById(id);
          this.displayImage(imgDOM, img).then(img => {
            console.log("display image successful")
          });
        })
    } 
  }
  displayImage(img, file) {
    return new Promise((resolve, rejfect) => {
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve(img);
      };
    });
  }

}
