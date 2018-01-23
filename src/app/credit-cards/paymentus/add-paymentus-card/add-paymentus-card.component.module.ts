import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AddPaymentusCardComponent} from "./add-paymentus-card.component";

@NgModule({
  declarations: [
	  AddPaymentusCardComponent,
  ],
  imports: [
	  AddPaymentusCardComponent,
  ],
  exports: [
	  AddPaymentusCardComponent
  ],
	schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddPaymentusCardComponentModule {
  constructor(){}
}