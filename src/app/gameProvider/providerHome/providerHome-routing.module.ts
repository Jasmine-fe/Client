import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderHomeComponent } from './providerHome.component';
import { ConfigPageComponent } from '../configPage/configPage.component'

const routes: Routes = [
  { path: '', component: ConfigPageComponent },
  { path: 'config', component: ConfigPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class providerHomeRoutingModule { }
