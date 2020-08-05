import { NgModule } from '@angular/core';
import { MaterialModule } from '../../MaterialModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GameContentComponent } from '../gameContent/gameContent.component'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpService } from '../../services/http.service'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    GameContentComponent
  ],
  imports: [
    DashboardRoutingModule,
    MaterialModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [  
    HttpService
  ],
  exports: [
  ],
})
export class DashboardModule { }
