import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VehiclesComponent } from './vehicles.component';
import {VehiclesDetailsComponent} from "../vehicles-details/vehicles-details.component";

@NgModule({
  declarations: [
    VehiclesComponent,
    VehiclesDetailsComponent
  ],
  imports: [
    VehiclesComponent,
  ],
  exports: [
    VehiclesComponent
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VehiclesComponentModule {}