import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './createPage.component.html',
  styleUrls: ['./createPage.component.css']
})
export class CreatePageComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public providerService: ProviderService) {}

  gameForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),

  });

  configForm: FormGroup = new FormGroup({
    core: new FormControl(''),
    resolution: new FormControl('')
  });

  mode = "create"; // create, setting
  
  ngOnInit() {
    
  }


  submit() {
    console.log("gameForm ", this.gameForm.value)
    console.log("configForm ", this.configForm.value)
  }

  uploadFileToServer(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, 'gameZipFile');
      formData.append('fileType', 'zip');
      this.providerService.uploadFile(formData)
      .subscribe((res) => {
        console.log("successful uplaod File ")
      })
    }
  }

  goNextStep() {
    this.mode = "setting"
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

  getFileBase64Encode(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  uploadImage(event) {
    let imgDOM = document.getElementById('upload-img');
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.displayImage(imgDOM, file).then(img => {
        console.log("display image successful")
      });


      var fd = new FormData();
      fd.append('image', file, 'test.png');
      this.providerService.uploadFile(fd)
        .subscribe((res) => {
          console.log("successful uplaod File ")
        })


    }
  }

}
