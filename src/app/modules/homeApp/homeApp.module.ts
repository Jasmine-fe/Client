import { NgModule } from '@angular/core';
import { LayoutComponent } from '../../modules/layout/layout.component';
import { HomeAppComponent } from './homeApp.component'
import { HomeRoutingModule } from './homeApp-routing.module'
import { MaterialModule } from '../../MaterialModule.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeAppComponent,
        LayoutComponent,
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule,
        RouterModule
    ],
    providers: [
    ],
    exports: [
    ],
  })
  export class HomeAppModule { }
  