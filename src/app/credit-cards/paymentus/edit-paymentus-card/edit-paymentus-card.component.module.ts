import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {EditPaymentusCardComponent} from './edit-paymentus-card.component';

@NgModule({
  declarations: [
	  EditPaymentusCardComponent,
  ],
  imports: [
	  EditPaymentusCardComponent,
  ],
  exports: [
	  EditPaymentusCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditPaymentusCardComponentModule {
  constructor(){}
}