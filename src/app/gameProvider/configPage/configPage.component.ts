import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';


@Component({
  selector: 'app-config-page',
  templateUrl: './configPage.component.html',
  styleUrls: ['./configPage.component.css']
})
export class ConfigPageComponent implements OnInit {
  
  gameList: Array<any> = [];
  configList: Array<any> = [];
  form: FormGroup;
  mode = "initial" // initial, changed
  current = {
    gameName: "",
    config: []
  }

  constructor(public fb: FormBuilder,
    public configService: ConfigService) { }

  ngOnInit() {
      this.configService.getConfigData()
      .subscribe((res: any) => {
        this.gameList = res.data.list;
        this.configList = res.data.config;
      })
  }

  createFormGroup() {
    const fgroup = this.fb.group({})
    this.current.config.forEach(element => {
      fgroup.addControl(element.gAcolumn, this.fb.control(element.newValue));
    });
    return fgroup;
  }

  async selectedGame(gameName) {
    this.mode = 'changed';
    this.current.gameName = gameName;
    await this.configList.forEach(element => {
      if (element.gamename == gameName) {
        this.current.config = element.config;
      }
    })
    this.form = this.createFormGroup();
  }
  
  submit() {
    console.log("this.form ", this.form.value)
  }

}
