import { NgModule } from '@angular/core';
import { LayoutComponent } from '../../modules/layout/layout.component';
import { HomeAppComponent } from './homeApp.component'
import { HomeRoutingModule } from './homeApp-routing.module'
import { MaterialModule } from '../../MaterialModule.module';
import { GameContentComponent } from '../../modules/gameContent/gameContent.component'
@NgModule({
    declarations: [
        HomeAppComponent,
        LayoutComponent,
        GameContentComponent
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
  