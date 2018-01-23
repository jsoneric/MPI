import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {EditAuthorizedotnetCardComponent} from './edit-authorizedotnet-card.component';

@NgModule({
  declarations: [
	  EditAuthorizedotnetCardComponent,
  ],
  imports: [
	  EditAuthorizedotnetCardComponent,
  ],
  exports: [
	  EditAuthorizedotnetCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditAuthorizedotnetCardComponentModule {
  constructor(){}
}