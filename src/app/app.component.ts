import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from './config/config.service';
import { User } from './interface/user.interface';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    public matdialog: MatDialog,
    public configService: ConfigService,) {}

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
      const config = { 
        data: {
          mode: 'search',
          userInfo: this.userInfo 
        }
      }
      this.matdialog.open(DialogComponent, config)
    })
  }

  openDialog(mode) {
    if( mode == 'search') {
      this.getUserInfo();
      
    }
    else if( mode == 'create') {
      const config = { 
        data: { 
          mode: 'create'
        }
      }
      this.matdialog.open(DialogComponent, config)
    }
  }
}
