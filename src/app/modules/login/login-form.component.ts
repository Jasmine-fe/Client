import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service'
import { mobileWidth, saltRounds } from '../../shared/common'
import { Router } from '@angular/router';
import { LoginService } from  '../../services/login.service';
import { GameServerService } from  '../../services/gameServer.service';
import { AuthenticationService } from '../../shared/auth/authentication.service';
import { notificationSetting } from '../../shared/common';
import * as bcryptjs from 'bcryptjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    public router: Router,
    public userService: UserService,
    public loginService: LoginService,
    public authenticationService: AuthenticationService,
    public gameServerService: GameServerService,
    private matSnackBar: MatSnackBar) {}
    options: any = notificationSetting;

  ngOnInit() {

  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordCheck: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  
  changeMode( newMode: string ) {
    this.mode = newMode;
  }

  setInfo() {
    const username = this.form.get('username').value
    const password = this.form.get('password').value
    this.userService.setUserInfo(username, password);
  }

  login() {
    this.setInfo();
    const payload = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }
    this.authenticationService.login(payload)
      .subscribe((res: any) => {
        console.log(" this.authenticationService.login", res)
        if (res && res.status == 200) {
          localStorage.setItem('currentUser', JSON.stringify(res.body.data.token));
          this.gameServerService.setUserInfo(payload);
          this.router.navigate(['/home'])
        }
        else {
          this.matSnackBar.open("帳號或密碼錯誤", 'fail', this.options);
        }
      },(err: any) => {
        console.log("err",err)
      })
  }
  
  userRegister() {
    const payload = {
      username: this.form.get('username').value,
      password: ""
    };

    const pwd = this.form.get('password').value
    bcryptjs.hash(pwd, saltRounds).then((hashText) => {
      payload.password = hashText;
      if (hashText) {
        this.loginService.register(payload)
          .subscribe((res: any) => {
            if (res && res.status == 200) {
              this.mode = "userLogin"
            }
            else {
              this.matSnackBar.open("伺服器錯誤請稍後再嘗試", 'fail', this.options); 
            }
          })
      }
    })
  }


  
  @Input() error: string | null;
  @Input() mode: string | null;  // state: userLogin, providerLogin, register, 

  @Output() submitEM = new EventEmitter();

}