import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CreditCardsComponent} from './credit-cards.component';

@NgModule({
  declarations: [
    CreditCardsComponent
  ],
  imports: [
    CreditCardsComponent
  ],
  exports: [
    CreditCardsComponent
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreditCardsComponentModule {}