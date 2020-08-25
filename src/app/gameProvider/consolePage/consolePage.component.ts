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


  typeArr = [ "current", "player", "chart"];

  data = {
    current: {
      gameName: "app-config-page",
      imageURL: "https://img.onl/6fFHHu"
    },
    player: {

    },
    chart: {

    }

  };

  currentForm: FormGroup;
  currentKeys = Object.keys(this.data.current);
  

  playerForm: FormGroup;
  playerKeys = Object.keys(this.data.player);

  chartForm: FormGroup;
  chartKeys = Object.keys(this.data.chart);

  constructor(public fb: FormBuilder) { }


  ngOnInit() {
    console.log("currentKeys", this.currentKeys)
    this.typeArr.forEach(type => {
      if (type === "current") {
        this.currentForm = this.createFormGroup("current");
      }
      else if (type === "player") {
        this.playerForm = this.createFormGroup("player");
      }
      else if (type === "chart") {
        this.playerForm = this.createFormGroup("chart");
      }
    })
  }

  showImg(event) {

  }

  createFormGroup(type) {
    const fgroup = this.fb.group({})

    if (type == "current") {
      this.currentKeys.forEach(column => {
        fgroup.addControl(column, this.fb.control(this.data.current[column]));
      });
    }
    else if (type == "player") {
      this.playerKeys.forEach(column => {
        fgroup.addControl(column, this.fb.control(this.data.player[column]));
      });
    }

    else if (type == "chart") {
      this.chartKeys.forEach(column => {
        fgroup.addControl(column, this.fb.control(this.data.chart[column]));
      });
    }

    console.log("fgroup", fgroup)
    return fgroup;
  }
  
  submit() {
    // console.log("this.form ", this.currentForm.value)
  }

}
