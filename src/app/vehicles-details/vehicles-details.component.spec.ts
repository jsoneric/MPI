import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, Renderer} from "@angular/core";
import {RendererMock} from "../../../test-config/custom-mocks/renderer.mock";
import {NavController, NavParams, IonicModule} from 'ionic-angular';
import {NavControllerMock} from '../../../test-config/custom-mocks/navController.mock';
import {FormBuilder} from '@angular/forms';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BarcodeScannerMock} from "@ionic-native-mocks/barcode-scanner";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {ListService} from "../shared/services/list.service";
import {ListServiceMock} from "../../../test-config/custom-mocks/list.service.mock";
import {VehicleService} from "../shared/services/vehicle.service";
import {VehicleServiceMock} from "../../../test-config/custom-mocks/vehicle.service.mock";
import {Vehicle} from "../shared/interfaces/vehicle.interface";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

import {VehiclesDetailsComponent} from "./vehicles-details.component";

describe('VehicleDetails Component', () => {
	let testVehicle: Vehicle = {vehicle_id:1,vin:'', extra:[], alias:'', update_date:'', create_date:'', state_id:'', color_id:'', make_id:'', owner_id:1, type:'', license:''};

	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[VehiclesDetailsComponent],
				imports: [IonicModule.forRoot(VehiclesDetailsComponent), TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					{provide:NavParams, useValue: jasmine.createSpyObj('NavParams', {get:{'thisVehicle':testVehicle}})},
					FormBuilder,
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:ListService, useClass:ListServiceMock},
					{provide:VehicleService, useClass:VehicleServiceMock},
					{provide:BarcodeScanner, useClass:BarcodeScannerMock},
					TranslateService,
					{provide: Renderer, useClass: RendererMock}
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(VehiclesDetailsComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof VehiclesDetailsComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let navParams:NavParams;
		let formBuilder:FormBuilder;
		let messagingService:MessagingService;
		let listService:ListService;
		let vehicleService:VehicleService;
		let barcodeScanner:BarcodeScanner;
		let translateService: TranslateService;
		let renderer: Renderer;

		let vehicleDetailsComponent: VehiclesDetailsComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			navParams = jasmine.createSpyObj('NavParams', {get:{'thisVehicle':testVehicle}});
			formBuilder = new FormBuilder();
			messagingService = MessagingServiceMock.instance();
			listService = ListServiceMock.instance();
			vehicleService = VehicleServiceMock.instance();
			barcodeScanner = new BarcodeScannerMock();
			translateService = TranslateServiceMock.instance();
			renderer = RendererMock.instance();

			vehicleDetailsComponent = new VehiclesDetailsComponent(
				navController,
				navParams,
				formBuilder,
				messagingService,
				listService,
				vehicleService,
				barcodeScanner,
				translateService,
				renderer);
		});

		describe('save method', () => {
			it('should be defined', () => {
				expect(vehicleDetailsComponent.save).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehicleDetailsComponent.save).toEqual('function');
			});

			it('should call the pop method of NavController if the form data has not been changed', () => {
				vehicleDetailsComponent.save();
				expect(navController.pop).toHaveBeenCalled();
			});

			it('should call the saveVehicle method of VehicleService if the form data has been changed', () => {
				vehicleDetailsComponent.vehicleDetails.markAsDirty();
				vehicleDetailsComponent.vehicleDetails.get('alias').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('license').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('state').setValue('CA');
				vehicleDetailsComponent.vehicleDetails.get('type').setValue('3');
				vehicleDetailsComponent.save()
					.then(() => {
						expect(vehicleService.saveVehicle).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController if the save succeeds', () => {
				vehicleDetailsComponent.vehicleDetails.markAsDirty();
				vehicleDetailsComponent.vehicleDetails.get('alias').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('license').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('state').setValue('CA');
				vehicleDetailsComponent.vehicleDetails.get('type').setValue('3');
				vehicleService.saveVehicle = jasmine.createSpy('saveVehicle', () => {}).and.returnValue(Promise.resolve({success:true}));
				vehicleDetailsComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});

			it('should call the raiseAlert method of MessagingService if the save fails', () => {
				vehicleDetailsComponent.vehicleDetails.markAsDirty();
				vehicleDetailsComponent.vehicleDetails.get('alias').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('license').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('state').setValue('CA');
				vehicleDetailsComponent.vehicleDetails.get('type').setValue('3');
				vehicleService.saveVehicle = jasmine.createSpy('saveVehicle', () => {}).and.returnValue(Promise.resolve({success:false}));
				vehicleDetailsComponent.save()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});

			it('should handle an error from the server if it happens', () => {
				vehicleDetailsComponent.vehicleDetails.markAsDirty();
				vehicleDetailsComponent.vehicleDetails.get('alias').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('license').setValue('abc123');
				vehicleDetailsComponent.vehicleDetails.get('state').setValue('CA');
				vehicleDetailsComponent.vehicleDetails.get('type').setValue('3');
				vehicleService.saveVehicle = jasmine.createSpy('saveVehicle', () => {}).and.returnValue(Promise.reject({success:false}));
				vehicleDetailsComponent.save()
					.catch(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});
		});

		describe('deleteVehicle method', () => {
			it('should be defined', () => {
				expect(vehicleDetailsComponent.deleteVehicle).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehicleDetailsComponent.deleteVehicle).toEqual('function');
			});

			it('should call the raiseConfirm method of MessagingService when called', () => {
				vehicleDetailsComponent.deleteVehicle();
				expect(messagingService.raiseConfirm).toHaveBeenCalled();
			});
		});

		describe('cancel method', () => {
			it('should be defined', () => {
				expect(vehicleDetailsComponent.cancel).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehicleDetailsComponent.cancel).toEqual('function');
			});

			it('should call the raiseConfirm method of MessagingService if the form is dirty when called', () => {
				vehicleDetailsComponent.vehicleDetails.markAsDirty();
				vehicleDetailsComponent.cancel()
					.then(() => {
						expect(messagingService.raiseConfirm).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController if the form is not dirty when called', () => {
				vehicleDetailsComponent.cancel()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});
		});

		describe('scan method', () => {
			it('should be defined', () => {
				expect(vehicleDetailsComponent.scan).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof vehicleDetailsComponent.scan).toEqual('function');
			});

			it('should call the scan method of BarcodeScanner when called', () => {
				barcodeScanner.scan = jasmine.createSpy('scan', () => {}).and.returnValue(Promise.resolve({data:{text:''}}));
				vehicleDetailsComponent.scan()
					.then(() => {
						expect(barcodeScanner.scan).toHaveBeenCalled();
					});
			});
		});
	});
});