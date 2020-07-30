import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component'
import { LoginModule } from './modules/login/login.module'


const routes: Routes = [
  // { path: '', component: LoginComponent},
  // { path: 'login', component: LoginComponent },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
