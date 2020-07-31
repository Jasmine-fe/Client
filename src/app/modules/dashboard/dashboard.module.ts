import { NgModule } from '@angular/core';
import { MaterialModule } from '../../MaterialModule.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    MaterialModule
  ],
  providers: [  
  ],
  exports: [
  ],
  entryComponents: [
    DashboardComponent
  ]
})
export class DashboardModule { }
