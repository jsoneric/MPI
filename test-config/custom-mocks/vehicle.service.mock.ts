import {Vehicle} from "../../src/app/shared/interfaces/vehicle.interface";

export class VehicleServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('VehicleService', [
			'loadVehicle',
			'vehicleList',
			'saveVehicle',
			'removeVehicle',
			'newVehicle'
		]);

		instance.loadVehicle.and.returnValue(Promise.resolve());
		instance.vehicleList.and.returnValue(Promise.resolve());
		instance.saveVehicle.and.returnValue(Promise.resolve());
		instance.removeVehicle.and.returnValue(Promise.resolve());
		instance.newVehicle.and.returnValue(<Vehicle>{});

		return instance;
	}
}