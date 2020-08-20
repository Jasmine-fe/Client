import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-config-page',
  templateUrl: './configPage.component.html',
  styleUrls: ['./configPage.component.css']
})
export class ConfigPageComponent implements OnInit {
  

  data = {
    core: "app-config-page",
    providerName: "Compal",
    gameNumber: "123"
  };

  dataKeys = Object.keys(this.data);

  form: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
      this.form = this.createFormGroup();
  }

  createFormGroup() {
    const fgroup = this.fb.group({})
    this.dataKeys.forEach(column => {
      fgroup.addControl(column, this.fb.control(this.data[column]));
    });
    return fgroup;
  }
  
  submit() {
    console.log("this.form ", this.form.value)
  }

}
