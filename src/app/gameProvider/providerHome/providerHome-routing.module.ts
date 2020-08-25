import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderHomeComponent } from './providerHome.component';
import { CreatePageComponent } from '../createPage/createPage.component'
import { ConfigPageComponent } from '../configPage/configPage.component'
import { ConsolePageComponent } from '../consolePage/consolePage.component'

const routes: Routes = [
  { path: '', component: ProviderHomeComponent },
  { path: 'create', component: CreatePageComponent },
  { path: 'config', component: ConfigPageComponent },
  { path: 'console', component: ConsolePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class providerHomeRoutingModule { }
