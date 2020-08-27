import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-console-page',
  templateUrl: './consolePage.component.html',
  styleUrls: ['./consolePage.component.css']
})
export class ConsolePageComponent implements OnInit {

  data = {
    current: {
      name: "app-config-page",
      imageURL: "https://img.onl/6fFHHu"
    },
    player: {
      currentPlayer: 3,
      dailyPlayer: 5,
      weeklyPlayer: 100,
      monthlyPlayer: 392,

    }
  };
  constructor() { }


  ngOnInit() {
  }

}
