import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config-page',
  templateUrl: './configPage.component.html',
  styleUrls: ['./configPage.component.css']
})
export class ConfigPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
      console.log("config page")
  }

}
