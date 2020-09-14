import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
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
    private matSnackBar: MatSnackBar) { }

  gameList = []
  progressingGameList = [];
  options: any = notificationSetting;
  
  ngOnInit() {
    this.gameService.getGameList()
    .subscribe((res) => {
      if(res && res.status == 200) {
        this.gameList = res.body.data
        this.displayImg()
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

  displayImg() {
    this.gameList.forEach((game, index) => {
      const blobImg = atob(game.imgData.data);
      var array = new Uint8Array(blobImg.length)
      for (var i = 0; i < blobImg.length; i++) { array[i] = blobImg.charCodeAt(i) }
      const img = new Blob([array]);
      let imgDOM = document.getElementById(`display-img${index}`);
      this.displayImage(imgDOM, img).then(img => {
        console.log("display image successful")
      });
    })
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
