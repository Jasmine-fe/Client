import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-page',
  templateUrl: './createPage.component.html',
  styleUrls: ['./createPage.component.css']
})
export class CreatePageComponent implements OnInit {
  

  data = {
    Name: "Pokamon Go",
    Image: "Image",
    Description: "The game's official launch began on July 6, 2016, with releases in Australia, New Zealand, and the United States. Due to server strain from high demand upon release, Niantic CEO John Hanke stated that the release in other regions was to be ",
    uploadFile: ""
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
