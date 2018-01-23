import { ConfigurationService } from "./configuration.service";
import { LocalStorageService } from "./localStorage.service";

import { inject, TestBed } from '@angular/core/testing';
import { IsDebugMock } from "@ionic-native-mocks/is-debug"
import { IsDebug } from "@ionic-native/is-debug";
import { IonicStorageModule } from '@ionic/storage';

describe('Configuration Service', () => {
	let CS;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:[IonicStorageModule.forRoot({name : 'PayByMobile'})],
			providers:[ConfigurationService, {provide:IsDebug, useClass:IsDebugMock}, LocalStorageService]
		});
	});

	beforeEach(inject([ConfigurationService], (configurationService: ConfigurationService, localStorageService: LocalStorageService) => {
		CS = configurationService;
	}));

	describe('getLogLevel method', () => {
		it('should be defined', () => {
			expect(CS.getLogLevel).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof CS.getLogLevel).toEqual('function');
		});

		it('should return the held value for logLevel', () => {
			CS.logLevel = 2;
			expect(CS.getLogLevel()).toEqual(2);
		});
	});

	describe('setLogLevel method', () => {
		it('should be defined', () => {
			expect(CS.setLogLevel).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof CS.setLogLevel).toEqual('function');
		});

		it('should try to set the passed value in localStorage', () => {
			spyOn(CS.localStorageService, 'setValue').and.callThrough();
			CS.setLogLevel(1);
			expect(CS.localStorageService.setValue).toHaveBeenCalledWith('logLevel', '1');
		});

		it('should replace the held value with the passed value after setting localStorage', () => {
			spyOn(CS.localStorageService, 'setValue').and.callFake(() => {
				return {
					then:(cbf) => {cbf();}
				}
			});
			CS.setLogLevel(1);
			expect(CS.logLevel).toEqual(1);
		});
	});

	// describe('getCloudSettings method', () => {
	// 	it('should be defined', () => {
	// 		expect(CS.getCloudSettings).toBeDefined();
	// 	});
	//
	// 	it('should be a function', () => {
	// 		expect(typeof CS.getCloudSettings).toEqual('function');
	// 	});
	//
	// 	it('should return the held value for cloudSettings', () => {
	// 		expect(CS.getCloudSettings()).toEqual({'core':{'app_id':'b7d71c79'}});
	// 	});
	// });

	describe('getSpinner method', () => {
		it('should be defined', () => {
			expect(CS.getSpinner).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof CS.getSpinner).toEqual('function');
		});

		it('should return the held value for spinner', () => {
			expect(CS.getSpinner()).toEqual('crescent');
		});
	});

	describe('getIsDebug method', () => {
		it('should be defined', () => {
			expect(CS.getIsDebug).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof CS.getIsDebug).toEqual('function');
		});

		it('should return the held value for spinner', () => {
			expect(CS.getIsDebug()).toBeFalsy();
		});
	});
});