import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../interface/user.interface';
@Component({
    selector: 'dialog-modal',
    templateUrl: './dialog.component.html',
  })

export class DialogComponent {
  @Output() toggleClose = new EventEmitter<boolean>();
  @Output() createUser = new EventEmitter<User>();
  @Input() mode : string;
  @Input() userInfo : User;
  newUser: User = {
    name: '',
    phone: ''
  };
    
  onToggleCloseModal() {
    this.toggleClose.emit(true)
  }

  onToggleNewUser() {
    this.createUser.emit({
      name: this.newUser.name,
      phone: this.newUser.phone
    })
  }

}