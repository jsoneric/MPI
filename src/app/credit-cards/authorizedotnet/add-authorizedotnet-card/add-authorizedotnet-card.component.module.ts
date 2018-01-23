import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AddAuthorizedotnetCardComponent} from "./add-authorizedotnet-card.component";

@NgModule({
  declarations: [
	  AddAuthorizedotnetCardComponent,
  ],
  imports: [
	  AddAuthorizedotnetCardComponent,
  ],
  exports: [
	  AddAuthorizedotnetCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddAuthorizedotnetCardComponentModule {
  constructor(){}
}