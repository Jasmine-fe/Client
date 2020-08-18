import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderHomeComponent } from './providerHome.component';
import { ConfigPageComponent } from '../configPage/configPage.component'

const routes: Routes = [
  {
    path: '', component: ProviderHomeComponent,
    children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'config', component: ConfigPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class providerHomeRoutingModule { }
