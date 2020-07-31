import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("LayoutComponent ")
  }
  category = [
    "Shooters",
    "Action",
    "RPG",
    "Racing",
    "MOBA/MMO",
    "Simulation",
    "Strategy"
  ]


}
