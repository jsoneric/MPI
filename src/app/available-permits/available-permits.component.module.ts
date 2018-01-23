import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AvailablePermitsComponent } from './available-permits.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AvailablePermitsComponent,
  ],
  imports: [
    AvailablePermitsComponent,
    CommonModule
  ],
  exports: [
    AvailablePermitsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AvailablePermitsComponentModule {}
