import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-gameContent',
  templateUrl: './gameContent.component.html',
  styleUrls: ['./gameContent.component.css']
})
export class GameContentComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  breakpoint: number;

  currentProvider = {
    companyName: '橘子遊戲',
    companyPhone: '(02) 2658-8866',
    companyAddress: '114台北市內湖區瑞湖街111號'
  }

  currentGame = {
    name: '拳擊遊戲',
    image: 'src/assets/gameCoverImage/gameCover2.png',
    descp: `Train. Fight. Win.
    Got what it takes to become a champion? You are Adonis Creed, fighting toe-to-toe with the world’s top opponents to establish your boxing legacy. This intense cinematic experience features new Phantom Melee Technology for impactful VR melee combat so you can train, fight, and win like Creed.
    
    Live Your Legacy
    Challenge both your body and mind as you experience the ascent of Adonis Creed from undiscovered underdog to world-class fighter, all within an immersive universe inspired by the Creed™ films. 
    
    Multiple Game Modes
    Choose your path to glory in multiple games modes: store-driven Career, customizable Freeplay, or minigame-based Training. 
    
    Online PvP
    PvP just got a lot more personal. Choose your champion, then set up a custom fight with a friend or find your contenders in crossplay Quick Match. Precise upper-body tracking ensures each blow resonates where it lands—on both your opponent and yourself.
    `,
    lastUpdateTime: '2020 / 05 / 19'
  }

  ngOnInit() {
    
    // get routerLink parameter
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      
   })
  }

}
