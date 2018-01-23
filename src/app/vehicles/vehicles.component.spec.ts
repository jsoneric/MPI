import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, ViewChild} from "@angular/core";
import {NavController, NavParams, Content} from "ionic-angular";
import {NavControllerMock} from "../../../test-config/custom-mocks/navController.mock";
import {NavParamsMock, ContentMock} from "ionic-mocks";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {VehicleService} from "../shared/services/vehicle.service";
import {VehicleServiceMock} from "../../../test-config/custom-mocks/vehicle.service.mock";
import {Vehicle} from "../shared/interfaces/vehicle.interface";
import {AlertButtonConfigClass} from "../shared/classes/alertConfig.class";
import {VehiclesDetailsComponent} from "../vehicles-details/vehicles-details.component";
import {UserClass} from "../shared/classes/user.class";
import {UserClassMock} from "../../../test-config/custom-mocks/user.class.mock";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

import {VehiclesComponent} from "./vehicles.component";

describe('Vehicles Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[VehiclesComponent],
				imports:[TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					{provide:NavParams, useClass:NavParamsMock},
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:VehicleService, useClass:VehicleServiceMock},
					{provide:UserClass, useClass:UserClassMock},
					{provide:Content, useClass:ContentMock},
					TranslateService
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			}).compileComponents();
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(VehiclesComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof VehiclesComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let navParams:NavParams;
		let messagingService:MessagingService;
		let vehicleService:VehicleService;
		let userClass:UserClass;
		let content:Content;
		let translateService:TranslateService

		let vehiclesComponent:VehiclesComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			navParams = NavParamsMock.instance();
			messagingService = MessagingServiceMock.instance();
			vehicleService = VehicleServiceMock.instance();
			userClass = UserClassMock.instance();
			content = ContentMock.instance();
			translateService = TranslateServiceMock.instance();

			vehiclesComponent = new VehiclesComponent(navController, navParams, messagingService, vehicleService, userClass, translateService);
		});

		describe('addNewVehicle method', () => {
			it('should be defined', () => {
				expect(vehiclesComponent.addNewVehicle).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehiclesComponent.addNewVehicle).toEqual('function');
			});

			it('should try to push a new component onto the navigation when called', () => {
				vehiclesComponent.addNewVehicle();
				expect(navController.push).toHaveBeenCalledWith(VehiclesDetailsComponent, {'theVehicle': vehicleService.newVehicle()});
			});
		});

		describe('editVehicle method', () => {
			it('should be defined', () => {
				expect(vehiclesComponent.editVehicle).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehiclesComponent.editVehicle).toEqual('function');
			});

			it('should try to push a new component onto the navigation when called', () => {
				let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};
				vehiclesComponent.editVehicle(testVehicle);
				expect(navController.push).toHaveBeenCalledWith(VehiclesDetailsComponent, {'theVehicle': testVehicle});
			});
		});

		describe('ionViewWillEnter method', () => {
			it('should be defined', () => {
				expect(vehiclesComponent.ionViewWillEnter).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehiclesComponent.ionViewWillEnter).toEqual('function');
			});

			//TODO: If this SO issue ever gets a good answer, update this test to use it.
			//https://stackoverflow.com/questions/46670530/how-to-handle-ionic-content-in-unit-tests
			xit('should assign the value of UserClass.vehicleList to the local variable', () => {
				vehiclesComponent.ionViewWillEnter();
				expect(vehiclesComponent.vehicles.length).toEqual(0);
			});
		});
	});
});