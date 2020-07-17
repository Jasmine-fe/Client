import { Component, EventEmitter, Output, Input, Inject, OnInit } from '@angular/core';
import { User } from '../interface/user.interface';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from '../config/config.service';


@Component({
    selector: 'dialog-modal',
    templateUrl: './dialog.component.html',
  })

export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public matdialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    public configService: ConfigService,) {
    
  }
  ngOnInit() {
    this.mode = this.data.mode;
    if(this.mode == 'search') {
      this.userInfo.name = this.data.userInfo.name
      this.userInfo.phone = this.data.userInfo.phone
    }
  }

  @Output() createUser = new EventEmitter<User>();
  mode='';
  newUser: User = {
    name: '',
    phone: ''
  };
  userInfo: User = {
    name: '',
    phone: ''
  };

  
    
  onToggleCloseModal() {
    this.dialogRef.close();
  }

  onToggleNewUser() {
    const payloay: User = this.newUser;
    this.configService.newUser(payloay)
    .subscribe((res) => {
        console.log("create success")
        this.mode = 'success'
    })
  }

}