import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AddSpreedlyCardComponent} from "./add-spreedly-card.component";

@NgModule({
  declarations: [
	  AddSpreedlyCardComponent,
  ],
  imports: [
	  AddSpreedlyCardComponent,
  ],
  exports: [
	  AddSpreedlyCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddSpreedlyCardComponentModule {
  constructor(){}
}