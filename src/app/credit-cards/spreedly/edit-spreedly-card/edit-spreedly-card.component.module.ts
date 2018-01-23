import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {EditSpreedlyCardComponent} from './edit-spreedly-card.component';

@NgModule({
  declarations: [
	  EditSpreedlyCardComponent,
  ],
  imports: [
	  EditSpreedlyCardComponent,
  ],
  exports: [
	  EditSpreedlyCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditSpreedlyCardComponentModule {
  constructor(){}
}