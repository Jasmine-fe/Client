import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { providerHomeRoutingModule } from './providerHome-routing.module';
import { ProviderHomeComponent } from './providerHome.component';
import { ConfigPageComponent } from '../configPage/configPage.component';
import { CreatePageComponent } from '../createPage/createPage.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../MaterialModule.module';
import { RouterModule } from '@angular/router';
import { ProviderService } from '../../services/provider.service';

@NgModule({
    declarations: [
      ProviderHomeComponent,
      ConfigPageComponent,
      CreatePageComponent
    ],
    imports: [
      providerHomeRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MaterialModule,
      RouterModule,
    ],
    providers: [
      ProviderService
    ],
    exports: [
    ]
  })
  export class ProviderHomeModule { }
  