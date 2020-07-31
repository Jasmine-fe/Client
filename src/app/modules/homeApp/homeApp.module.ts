import { NgModule } from '@angular/core';
import { LayoutComponent } from '../../modules/layout/layout.component';
import { HomeAppComponent } from './homeApp.component'
import { HomeRoutingModule } from './homeApp-routing.module'
import { MaterialModule } from '../../MaterialModule.module';

@NgModule({
    declarations: [
        HomeAppComponent,
        LayoutComponent
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule
    ],
    providers: [
    ],
    exports: [
    ],
  })
  export class HomeAppModule { }
  