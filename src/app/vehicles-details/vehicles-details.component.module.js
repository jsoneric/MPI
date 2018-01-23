var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VehiclesDetailsComponent } from './vehicles-details.component';
import { VehiclesComponent } from "../vehicles/vehicles.component";
let VehiclesDetailsComponentModule = class VehiclesDetailsComponentModule {
};
VehiclesDetailsComponentModule = __decorate([
    NgModule({
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
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], VehiclesDetailsComponentModule);
export { VehiclesDetailsComponentModule };
//# sourceMappingURL=vehicles-details.component.module.js.map