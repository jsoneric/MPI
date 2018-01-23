import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VehiclesDetailsComponent } from './vehicles-details.component';
import {VehiclesComponent} from "../vehicles/vehicles.component";

@NgModule({
  declarations: [
	VehiclesDetailsComponent,
	VehiclesComponent
  ],
  imports: [
    VehiclesDetailsComponent,
	VehiclesComponent
  ],
  exports: [
    VehiclesDetailsComponent
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VehiclesDetailsComponentModule {}