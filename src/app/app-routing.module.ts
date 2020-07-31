import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component'
import { LoginModule } from './modules/login/login.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'


const routes: Routes = [
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
