import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ParkPurchaseComponent } from './park-purchase.component';

@NgModule({
  declarations: [
    ParkPurchaseComponent,
  ],
  imports: [
    ParkPurchaseComponent,
  ],
  exports: [
    ParkPurchaseComponent
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ParkPurchaseComponentModule {}