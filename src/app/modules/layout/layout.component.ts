import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { mobileWidth } from '../../shared/common'
import { AuthenticationService } from '../../shared/auth/authentication.service';

interface AndroidInterface {
  setting(): any;
}
declare var Android: AndroidInterface;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}
  category = [
    "Shooters",
    "Action",
    "RPG",
    "Racing",
    "MOBA/MMO",
    "Simulation",
    "Strategy"
  ]

  events: string[] = [];
  opened: boolean = true;
  mode="side"

  ngOnInit() {
    var screenWidth = screen.width;
    console.log("screenWidth:", screenWidth)
    // if(screenWidth < mobileWidth) {
      this.opened = false;
      this.mode = "side"
    // } else {
    //   this.opened = true;
    //   this.mode = "side" push
    // }
  }

  setConfig() {
    console.log("click Android")
    Android.setting();
  }

  logout() {
    this.authenticationService.logout();
  }
  
  

}
