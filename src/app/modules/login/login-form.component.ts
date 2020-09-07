import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service'
import { mobileWidth } from '../../shared/common'
import { Router } from '@angular/router';
import { LoginService } from  '../../services/login.service';
import { GameServerService } from  '../../services/gameServer.service';
import { AuthenticationService } from '../../shared/auth/authentication.service';

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
    public gameServerService: GameServerService) {}
  
    // mode = 'userLogin' // state: userLogin, providerLogin, register, 

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
      password: this.form.get('password').value
    }
    this.authenticationService.login(payload)
    .subscribe((response: any) => {      
      if(response && response.status == 200) {
        this.gameServerService.setUserInfo(payload);
        this.router.navigate(['/home'])
      }      
    })  
    
   
  }

  
  @Input() error: string | null;
  @Input() mode: string | null;

  @Output() submitEM = new EventEmitter();

}