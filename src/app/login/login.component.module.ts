import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { LoginComponent } from './login.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotComponent,
    SignUpComponent
  ],
  imports: [
    LoginComponent,
  ],
  exports: [
    LoginComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponentModule { }