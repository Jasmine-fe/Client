import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service'
import { mobileWidth } from '../../shared/common'
import { LoginService } from  '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    public userService: UserService,
    public loginService: LoginService,
    public router: Router) {}
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
      name: this.form.get('username').value
    }
    console.log(" this.form.value",  payload)
    this.loginService.checkLogin(payload)
    .subscribe((res: any) => {
      if(res && res.data) {
        // ?! check navigate url
        this.router.navigate(['/home'])
      }      
    })  
    
   
  }

  
  @Input() error: string | null;
  @Input() mode: string | null;

  @Output() submitEM = new EventEmitter();

}