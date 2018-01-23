import {HttpService} from "./http.service";
import {HttpServiceMock} from "../../../../test-config/custom-mocks/http.service.mock";
import {LoggingService} from "./logging.service";
import {LoggingServiceMock} from "../../../../test-config/custom-mocks/logging.service.mock";
import {Vehicle} from "../interfaces/vehicle.interface";
import {HttpRequestObject} from "../classes/httpRequest.class";
import {UserClass} from "../classes/user.class";
import {UserClassMock} from "../../../../test-config/custom-mocks/user.class.mock";

import {VehicleService} from "./vehicle.service";

describe('Vehicle Service', () => {
	let httpService:HttpService;
	let loggingService: LoggingService;
	let vehicle:Vehicle;
	let httpRequestObject:HttpRequestObject;
	let userClass:UserClass;

	let vehicleService: VehicleService;

	beforeEach(() => {
		httpService = HttpServiceMock.instance();
		loggingService = LoggingServiceMock.instance();
		userClass = UserClassMock.instance();

		vehicleService = new VehicleService(httpService, loggingService, userClass);
	});

	describe('loadVehicle method', () => {
		it('should be defined', () => {
			expect(vehicleService.loadVehicle).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof vehicleService.loadVehicle).toEqual('function');
		});

		it('should call the load method of HttpService when called', () => {
			vehicleService.loadVehicle(1)
				.then(() => {
					expect(httpService.load).toHaveBeenCalled();
				})
		});

		it('should return the requested vehicle if it exists', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
				success:true,
				vehicle:{
					vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''
				}
			}));
			vehicleService.loadVehicle(1)
				.then((resp) => {
					expect(resp.vehicle_id).toEqual(1);
				});
		});

		it('should return an empty array when the requested vehicle is not found', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
				success:false
			}));
			vehicleService.loadVehicle(1)
				.then((resp) => {
					expect(resp).toBeNull();
				});
		});
	});

	describe('vehicleList method', () => {
		it('should be defined', () => {
			expect(vehicleService.vehicleList).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof vehicleService.vehicleList).toEqual('function');
		});

		it('should call the reload method of UserClass when called', () => {
			vehicleService.vehicleList()
				.then((resp) => {
					expect(httpService.load).toHaveBeenCalled();
				})
		});

		//TODO Fix this test
		// it('should return the failure message when it fails', () => {
		// 	httpService.load = jasmine.createSpy('reload', () => {}).and.returnValue(Promise.resolve({success:false,msg:'failed'}));
		// 	vehicleService.vehicleList()
		// 		.then((resp) => {
		// 			expect(resp.msg).toEqual('failed');
		// 		});
		// });

		it('should return the server error if one happens', () => {
			httpService.load = jasmine.createSpy('reload', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
			vehicleService.vehicleList()
				.catch((resp) => {
					expect(resp.msg).toEqual('failed');
				});
		});
	});

	describe('saveVehicle method', () => {
		it('should be defined', () => {
			expect(vehicleService.saveVehicle).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof vehicleService.saveVehicle).toEqual('function');
		});

		it('should call the create method of HttpService', () => {
			let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};
			httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, vehicle:testVehicle}));
			vehicleService.saveVehicle(testVehicle)
				.then(() => {
					expect(httpService.create).toHaveBeenCalled();
				});
		});

		it('should return the server error if one happens', () => {
			let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};
			httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
			vehicleService.saveVehicle(testVehicle)
				.catch((resp) => {
					expect(resp.msg).toEqual('failed');
				});
		});
	});

	describe('removeVehicle method', () => {
		it('should be defined', () => {
			expect(vehicleService.removeVehicle).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof vehicleService.removeVehicle).toEqual('function');
		});

		it('should call the create method of HttpService when called', () => {
			let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};
			httpService.load = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, vehicle:testVehicle}));
			vehicleService.removeVehicle(testVehicle)
				.then(() => {
					expect(httpService.load).toHaveBeenCalled();
				});
		});

		it('should return the server error if one happens', () => {
			let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};
			httpService.load = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
			vehicleService.removeVehicle(testVehicle)
				.catch((resp) => {
					expect(resp.msg).toEqual('failed');
				});
		});
	});

	describe('newVehicle method', () => {
		it('should be defined', () => {
			expect(vehicleService.newVehicle).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof vehicleService.newVehicle).toEqual('function');
		});

		it('should return an uninitialized vehicle when called', () => {
			expect(vehicleService.newVehicle().vehicle_id).toEqual(0);
		});
	})
});