import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form.component';
import { ProviderLoginComponent } from './providerLogin.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../../MaterialModule.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service'


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    ProviderLoginComponent
  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    LoginService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ],
  exports: [
  ],
  entryComponents: [
    LoginFormComponent
  ]
})
export class LoginModule { }
