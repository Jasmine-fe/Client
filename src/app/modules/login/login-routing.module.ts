import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ProviderLoginComponent } from './providerLogin.component'

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'user', component: LoginComponent },
  { path: 'provider', component: ProviderLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
