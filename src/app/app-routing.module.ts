import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// module must import here to load properly
import { LoginModule } from './modules/login/login.module'
import { HomeAppModule } from './modules/homeApp/homeApp.module'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home', loadChildren: './modules/homeApp/homeApp.module#HomeAppModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
