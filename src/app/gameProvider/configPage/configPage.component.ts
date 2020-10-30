import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { notificationSetting } from '../../shared/common';


@Component({
  selector: 'app-config-page',
  templateUrl: './configPage.component.html',
  styleUrls: ['./configPage.component.css']
})
export class ConfigPageComponent implements OnInit {
  columnIdCount = [1, 8, 11, 12, 13, 32];
  gameList: Array<any> = [];
  configList: Array<any> = [];
  form: FormGroup;
  modifyConfig: Array<any> = [];
  options: any = notificationSetting;
  mode = "initial" // initial, changed
  current = {
    gameName: "",
    config: []
  }
  showImg: any;
  fd = new FormData();
  coreOptions: any;
  videoOptions: any
  audioOptions: any
  filterOptions: any
  gaServerEventDrivenOptions: any
  gaClientOptions: any

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
  optionsMenu = {}
  optionsGaColumn: any = [];
  optionsValue: any = [];
  optionsData: any = [];

  constructor(public fb: FormBuilder,
    public configService: ConfigService,
    public router: Router,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.configService.getOptions()
      .subscribe((res:any) => {
        if(res.data) {
          this.optionsData = res.data;
          this.handleOptionData(this.optionsData);
        }
      })
    this.initalFormData();
    this.getModifyData();
  }

  getModifyData() {
    this.configService.getConfigData()
      .subscribe((res: any) => {
        this.gameList = res.data.list;
        this.configList = res.data.config;
      })
  }

  initalFormData() {
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

  handleDefaultValue(form, options, formControlName) {
    options.forEach((element, index) => {
      if (element.default_value !== 'True' && element.default_value !== 'true') {
        const i = formControlName[index];
        form.get(i).setValue(element.default_value);
      }
    });
  }

  async handleOptionData(data) {
    
    await data.forEach(element => {
      this.optionsMenu[element.gAcolumn] = element.value;
    })

  }

  async selectedGame(gameName) {
    this.mode = 'changed';
    this.current.gameName = gameName;
    await this.resetModifyValue();
    await this.configList.forEach(element => {
      if (element.gamename == gameName) {
        this.current.config = element.config;
      }
    })
    await this.setModifyValue(this.current.config);
  }

  setModifyValue(config) {
    config.forEach((data, index) => {
      switch (data.dictionary) {
        case "[core]": {
          const controlName = this.coreFormControlName[data.columnId - this.columnIdCount[0]]
          this.coreForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[video]": {
          const controlName = this.videoFormControlName[data.columnId - this.columnIdCount[1]]
          this.videoForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[audio]": {
          const controlName = this.audioFormControlName[data.columnId - this.columnIdCount[2]]
          this.audioForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[filter]": {
          const controlName = this.filterFormControlName[data.columnId - this.columnIdCount[3]]
          this.filterForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[ga-server-event-driven]": {
          const controlName = this.gaServerFormControlName[data.columnId - this.columnIdCount[4]]
          this.gaServerForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[ga-client]": {
          const controlName = this.gaClientFormControlName[data.columnId - this.columnIdCount[5]]
          this.gaClientForm.get(controlName).setValue(data.newValue);
          break;
        }
        default:
          break;
      }
    });
  }

  resetModifyValue() {
    console.log("current: ", this.current.config)
    this.current.config.forEach((data, index) => {
      switch (data.dictionary) {
        case "[core]": {
          const controlName = this.coreFormControlName[data.columnId - this.columnIdCount[0]]
          this.coreForm.get(controlName).setValue(data.defaultValue);
          break;
        }
        case "[video]": {
          const controlName = this.videoFormControlName[data.columnId - this.columnIdCount[1]]
          this.videoForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[audio]": {
          const controlName = this.audioFormControlName[data.columnId - this.columnIdCount[2]]
          this.audioForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[filter]": {
          const controlName = this.filterFormControlName[data.columnId - this.columnIdCount[3]]
          this.filterForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[ga-server-event-driven]": {
          const controlName = this.gaServerFormControlName[data.columnId - this.columnIdCount[4]]
          this.gaServerForm.get(controlName).setValue(data.newValue);
          break;
        }
        case "[ga-client]": {
          const controlName = this.gaClientFormControlName[data.columnId - this.columnIdCount[5]]
          this.gaClientForm.get(controlName).setValue(data.newValue);
          break;
        }
        default:
          break;
      }
    });
  }

  modifyConfigGame() {
    const payload = {
      gamename: this.current.gameName,
      config: this.modifyConfig
    };
    this.configService.setDataConfig(payload)
      .subscribe((res: any) => {
        if (res && res.success) {
          this.matSnackBar.open("修改遊戲設定檔成功", 'success', this.options);
          this.router.navigate(['/provider']);
        }
        else {
          this.matSnackBar.open("修改遊戲設定檔失敗", 'fail', this.options);
        }
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