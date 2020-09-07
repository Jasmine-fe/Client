import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './MaterialModule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { GameServerService } from './services/gameServer.service';
import { ConnectService } from './services/connect.service';
import { JwtInterceptor } from './shared/auth/jwt.interceptor';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthenticationService } from './shared/auth/authentication.service';

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
    ConnectService,
    AuthGuard,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
