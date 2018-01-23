import {HttpService} from "./http.service";
import {HttpServiceMock} from "../../../../test-config/custom-mocks/http.service.mock";
import {LoggingService} from "./logging.service";
import {LoggingServiceMock} from "../../../../test-config/custom-mocks/logging.service.mock";
import {HttpRequestObject} from "../classes/httpRequest.class";
import {State} from "../interfaces/state.interface";
import {Lot} from "../interfaces/lot.interface";
import {VehicleType} from "../interfaces/vehicleType.interface";

import {ListService} from "./list.service";

describe('List Service', () => {
	let httpService: HttpService;
	let loggingService: LoggingService;
	let httpRequestObject: HttpRequestObject;
	let state: State;
	let lot: Lot;
	let vehicleType: VehicleType;

	let listService: ListService;

	beforeEach(() => {
		httpService = HttpServiceMock.instance();
		loggingService = LoggingServiceMock.instance();

		listService = new ListService(httpService, loggingService);
	});

	describe('loadLists method', () => {
		it('should be defined', () => {
			expect(listService.loadLists).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof listService.loadLists).toEqual('function');
		});

		it('should call the load method of HttpService', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:false}));
			listService.loadLists();
			expect(httpService.load).toHaveBeenCalled();
		});

		it('should populate the lots list upon success', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
				success:true,
				states:[{citation_type_id:1,codeid:'',description:'',is_other:0,is_overtime:0,type:'',uuid:''}],
				lots:[{lot_id:0,number:1,description:'',is_hub:0}],
				vehicle_classes:[{vehicle_class_id:0,name:'',order_value:1}]
			}));
			listService.loadLists()
				.then(() => {
					expect(listService.lots.length).toEqual(1);
				});
		});

		it('should populate the states list upon success', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
				success:true,
				states:[{citation_type_id:1,codeid:'',description:'',is_other:0,is_overtime:0,type:'',uuid:''}],
				lots:[{lot_id:0,number:1,description:'',is_hub:0}],
				vehicle_classes:[{vehicle_class_id:0,name:'',order_value:1}]
			}));
			listService.loadLists()
				.then(() => {
					expect(listService.states.length).toEqual(1);
				});
		});

		it('should populate the vehicleTypes list upon success', () => {
			httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({
				success:true,
				states:[{citation_type_id:1,codeid:'',description:'',is_other:0,is_overtime:0,type:'',uuid:''}],
				lots:[{lot_id:0,number:1,description:'',is_hub:0}],
				vehicle_classes:[{vehicle_class_id:0,name:'',order_value:1}]
			}));
			listService.loadLists()
				.then(() => {
					expect(listService.vehicleTypes.length).toEqual(1);
				});
		});
	});
});