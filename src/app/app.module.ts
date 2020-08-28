import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './MaterialModule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { GameServerService } from './services/gameServer.service';
import { ConnectService } from './services/connect.service';

import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    GameService,
    UserService,
    GameServerService,
    ConnectService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
