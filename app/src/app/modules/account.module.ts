import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '../components/account/login/login.component';
import {RegisterComponent} from '../components/account/register/register.component';
import {LogoutComponent} from '../components/account/logout/logout.component';
import {AuthenticationService} from '../services/authentication.service';
import {FormValidationErrorComponent} from "../components/helpers/form-validation-error.component";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService],
	declarations: [LoginComponent, RegisterComponent, LogoutComponent, FormValidationErrorComponent],
	exports: [LoginComponent, RegisterComponent, LogoutComponent, FormValidationErrorComponent]
})
export class AccountModule {

}
