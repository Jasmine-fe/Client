import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAppComponent } from './homeApp.component';
import { DashboardModule } from '../../modules/dashboard/dashboard.module'
import { GameContentComponent } from '../../modules/gameContent/gameContent.component';
const routes: Routes = [
  {
    path: '', component: HomeAppComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'src/app/modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'content', component: GameContentComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
