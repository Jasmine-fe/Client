import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from './config/config.service';
import { User } from './interface/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public dialog: MatDialog,
    public configService: ConfigService) {}

  mode = '';
  title = 'client';
  openModal = false;
  newUser: User;
  userInfo: User = {
    name: '',
    phone: ''
  };
  message;

  getUserInfo() {
    this.configService.getUser()
    .subscribe((res) => {
      this.userInfo.name = res.name;
      this.userInfo.phone = res.phone;
    })
  }

  openDialog(mode) {
    if( mode == 'search') {
      this.getUserInfo();
    }
    this.openModal = true;
    this.mode = mode;
  }

  closeDialog() {
    this.openModal = false;
  }

  createUser(e) {
    this.newUser = {
      name: e.name,
      phone: e.phone
    };

    const payloay: User = this.newUser;
    this.configService.newUser(payloay)
    .subscribe((res) => {
        console.log("create success")
    })


  }



}
