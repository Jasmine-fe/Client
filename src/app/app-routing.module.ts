import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// module must import here to load properly
import { LoginModule } from './modules/login/login.module'
import { HomeAppModule } from './modules/homeApp/homeApp.module'
import { AppModule } from './app.module';
import { ProviderHomeModule } from './gameProvider/providerHome/providerHome.module'
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',canLoad: [AuthGuard], loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'home',canLoad: [AuthGuard], loadChildren: './modules/homeApp/homeApp.module#HomeAppModule' },
  { path: 'provider',canLoad: [AuthGuard], loadChildren: './gameProvider/providerHome/providerHome.module#ProviderHomeModule'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
