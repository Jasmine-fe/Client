import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { ConfigService } from '../../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notificationSetting } from '../../shared/common';

@Component({
  selector: 'app-create-page',
  templateUrl: './createPage.component.html',
  styleUrls: ['./createPage.component.css']
})
export class CreatePageComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public providerService: ProviderService,
    public configService: ConfigService,
    public router: Router,
    private matSnackBar: MatSnackBar) { }

  gameForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    descp: new FormControl('', Validators.required),
  });

  coreForm: FormGroup = new FormGroup({
    coreServer: new FormControl(true, Validators.required),
    coreController: new FormControl(true, Validators.required),
    coreVideo: new FormControl(true, Validators.required),
    coreVideoParm: new FormControl(true, Validators.required),
    coreAudioLame: new FormControl(true, Validators.required),
    coreAudioOpus: new FormControl(true, Validators.required),
    coreProto: new FormControl('', Validators.required),
  });
  coreFormControlName = ['coreServer', 'coreController', 'coreVideo', 'coreVideoParm', 'coreAudioLame', 'coreAudioOpus', 'coreProto']


  videoForm: FormGroup = new FormGroup({
    videoFps: new FormControl(''),
    videoSpecificB: new FormControl(''),
    videoSpecificG: new FormControl(''),
  })
  videoFormControlName = ['videoFps', 'videoSpecificB', 'videoSpecificG']


  audioForm: FormGroup = new FormGroup({
    audioDelay: new FormControl('', Validators.required),
  })
  audioFormControlName = ['audioDelay'];


  filterForm: FormGroup = new FormGroup({
    filterSP: new FormControl('', Validators.required),
  })
  filterFormControlName = ['filterSP'];

  gaServerForm: FormGroup = new FormGroup({
    gaServerDir: new FormControl('', Validators.required),
    gaServerExe: new FormControl('', Validators.required),
    gaServerType: new FormControl('', Validators.required),
    gaServerToken: new FormControl('', Validators.required),
    gaServerReso: new FormControl('', Validators.required),
    gaServerOutReso: new FormControl('', Validators.required),
    gaServerHookAudio: new FormControl('', Validators.required),
    gaServerHookExp: new FormControl('', Validators.required),
    gaServerEnable: new FormControl(true, Validators.required),
    gaServerMaxrate: new FormControl('', Validators.required),
    gaServerBufsize: new FormControl('', Validators.required),
    gaServerEnableSRC: new FormControl('', Validators.required),
    gaServerNTTF: new FormControl('', Validators.required),
    gaServerMT: new FormControl('', Validators.required),
    gaServerFWC: new FormControl('', Validators.required),
  })
  gaServerFormControlName = ['gaServerDir', 'gaServerExe', 'gaServerType', 'gaServerToken', 'gaServerReso', 'gaServerOutReso',
    'gaServerHookAudio', 'gaServerHookExp', 'gaServerEnable', 'gaServerMaxrate', 'gaServerBufsize',
    'gaServerEnableSRC', 'gaServerNTTF', 'gaServerMT', 'gaServerFWC'];


  gaClientForm: FormGroup = new FormGroup({
    gaClientCRMM: new FormControl('', Validators.required),
    gaClientVS: new FormControl('', Validators.required),
    gaClientMTVD: new FormControl('', Validators.required),
  })
  gaClientFormControlName = ['gaClientCRMM', 'gaClientVS', 'gaClientMTVD'];

  options: any = notificationSetting;
  mode = "create"; // create, setting
  showImg: any;
  fd = new FormData();
  modifyConfig: Array<any> = [];
  coreOptions: any;
  videoOptions: any
  audioOptions: any
  filterOptions: any
  gaServerEventDrivenOptions: any
  gaClientOptions: any
  optionsData: any
  count = 0;
  optionsMenu = {}
  ngOnInit() {
    this.configService.getOptions()
      .subscribe((res:any) => {
        if(res.data) {
          this.optionsData = res.data;
          this.handleOptionData(this.optionsData);
        }
      })

    this.configService.getConfigTemplate()
      .subscribe((res: any) => {
        if (res.data) {
          res.data.forEach((dic, index) => {
            const key = Object.keys(dic)[0];
            switch (key) {
              case "[core]": {
                this.coreOptions = Object.values(dic)[0];
                this.handleDefaultValue(this.coreForm, this.coreOptions, this.coreFormControlName);
                break;
              }
              case "[video]": {
                this.videoOptions = Object.values(dic)[0];
                this.handleDefaultValue(this.videoForm, this.videoOptions, this.videoFormControlName);
                break;
              }
              case "[audio]": {
                this.audioOptions = Object.values(dic)[0]
                this.handleDefaultValue(this.audioForm, this.audioOptions, this.audioFormControlName);
                break;
              }
              case "[filter]": {
                this.filterOptions = Object.values(dic)[0]
                this.handleDefaultValue(this.filterForm, this.filterOptions, this.filterFormControlName);
                break;
              }
              case "[ga-server-event-driven]": {
                this.gaServerEventDrivenOptions = Object.values(dic)[0]
                this.handleDefaultValue(this.gaServerForm, this.gaServerEventDrivenOptions, this.gaServerFormControlName);
                break;
              }
              case "[ga-client]": {
                this.gaClientOptions = Object.values(dic)[0]
                this.handleDefaultValue(this.gaClientForm, this.gaClientOptions, this.gaClientFormControlName);
                break;
              }
              default:
                break;
            }
          });
        }
      })
  }

  async handleOptionData(data) {
    
    await data.forEach(element => {
      this.optionsMenu[element.gAcolumn] = element.value;
    })

  }

  handleDefaultValue(form, options, formControlName) {
    options.forEach((element, index) => {
      if (element.default_value !== 'True' && element.default_value !== 'true') {
        const i = formControlName[index];
        form.get(i).setValue(element.default_value);
      }
    });
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

  uploadImage(event) {
    let imgDOM = document.getElementById('upload-img');
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.displayImage(imgDOM, file)
      this.fd.append('image', file, file.name);
    }
  }

  uploadZip(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      const gameName = this.gameForm.value.name;
      let formData: FormData = new FormData();
      formData.append('zip', file, file.name);
      formData.append('fileType', 'zip');
      console.log("formData", formData)
      const payload = formData;
      this.providerService.uploadZip(payload, gameName)
        .subscribe((res) => {
          console.log("upload game successfully")
        })
    }
  }

  createNewGame() {
    const gamePayload = this.gameForm.value;
    const modifyValue = this.modifyConfig;

    // create info in gameList table
    this.providerService.createNewGame(gamePayload)
      .subscribe((res) => {
        const imgPayload = {
          formData: this.fd,
          gameName: this.gameForm.value.name
        }

        // gameServer config
        const payload = {
          gamename: this.gameForm.value.name,
          config: modifyValue
        };

        this.configService.recordDataConfig(payload)
          .subscribe((res: any) => {
            console.log("record DataConfig successfully")
            if (res && res.success) {
              this.matSnackBar.open("新增遊戲成功", 'success', this.options);
              this.router.navigate(['/provider']);
            }
            else {
              this.matSnackBar.open("新增遊戲失敗", 'fail', this.options);
            }
          })
        this.providerService.uploadImg(imgPayload)
          .subscribe((res) => {
            console.log("upload image successfully")
          })
        this.providerService.gameServerModifyConfig(payload)
          .subscribe((res) => {
            console.log("gameServerModifyConfig successfully")
          })

      })
  }

  changeCheckBox(form, dictionary, GAcolumn, checked, id) {
    form[GAcolumn] = checked;
    const data = {
      GAcolumn,
      id,
      default_value: !checked,
    }
    this.changeInput(dictionary, checked, data);
  }

  changeInput(dictionary, newValue, option) {
    const { GAcolumn: gAcolumn, default_value: defaultValue, id: columnId } = option;
    this.modifyConfig.push({ defaultValue, dictionary, gAcolumn, newValue, columnId });
  }


}



