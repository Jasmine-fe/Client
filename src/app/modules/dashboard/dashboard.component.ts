import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() {}

  gameList = [
    {
      name: 'apple',
      image: 'src/assets/gameCoverImage/gameCover1.png',
      description: 'I am a anew game'
    }, 
    {
      name: 'banana',
      image: 'src/assets/gameCoverImage/gameCover2.png',
      description: 'I am a anew game'
    },
    {
      name: 'catcar',
      image: 'src/assets/gameCoverImage/gameCover3.png',
      description: 'I am a anew game'
    },
    {
      name: 'apple',
      image: 'src/assets/gameCoverImage/gameCover1.png',
      description: 'I am a anew game'
    }, 
    {
      name: 'banana',
      image: 'src/assets/gameCoverImage/gameCover2.png',
      description: 'I am a anew game'
    },
    {
      name: 'catcar',
      image: 'src/assets/gameCoverImage/gameCover3.png',
      description: 'I am a anew game'
    }
  ]

  ngOnInit() {
  }

}
