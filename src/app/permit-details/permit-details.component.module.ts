import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { PermitDetailsComponent } from './permit-details.component';
import { PermitsComponent } from '../permits/permits.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PermitDetailsComponent,
    PermitsComponent
  ],
  imports: [
    PermitDetailsComponent,
    PermitsComponent,
      CommonModule
  ],
  exports: [
    PermitDetailsComponent
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PermitDetailsComponentModule {}
