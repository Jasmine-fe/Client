import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { providerHomeRoutingModule } from './providerHome-routing.module';
import { ProviderHomeComponent } from './providerHome.component';
import { ConfigPageComponent } from '../configPage/configPage.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../MaterialModule.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
      ProviderHomeComponent,
      ConfigPageComponent
    ],
    imports: [
      providerHomeRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MaterialModule,
      RouterModule
    ],
    providers: [],
    exports: [
    ]
  })
  export class ProviderHomeModule { }
  