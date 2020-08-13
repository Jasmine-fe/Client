import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service'
import { mobileWidth } from '../../shared/common'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver,
    public userService: UserService) {}
  mode = 'login' // state: login, register

  ngOnInit() {

  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordCheck: new FormControl(''),
    email: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  
  changeMode() {
    this.mode = (this.mode === "login") ? "register" : "login";
  }

  setInfo() {
    const username = this.form.get('username').value
    const password = this.form.get('password').value
    console.log("username", username, "password", password)
    this.userService.setUserInfo(username, password);
  }
  
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}