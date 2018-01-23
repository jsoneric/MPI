import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { ParkComponent } from './park.component';

@NgModule({
  declarations: [
    ParkComponent,
  ],
  imports: [
    ParkComponent,
  ],
  exports: [
    ParkComponent
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ParkComponentModule {}