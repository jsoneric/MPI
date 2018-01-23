import {LocalStorageService} from "./localStorage.service";

import {Storage} from "@ionic/storage";
import {StorageMock} from "../../../../test-config/custom-mocks/storage.mock";

describe('LocalStorage Service', () => {
	let storage: Storage;

	let localStorageService: LocalStorageService;
	let callback = () => {console.error('error call');};

	beforeEach(() => {
		storage = StorageMock.instance('Test', 'Bed');

		localStorageService = new LocalStorageService(storage);
	});

	describe('setValue method', () => {
		it('should be defined', () => {
			expect(localStorageService.setValue).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof localStorageService.setValue).toEqual('function');
		});

		it('should check to see if storage is ready', () => {
			localStorageService.setValue('Test', 'Bed');
			expect(storage.ready).toHaveBeenCalled();
		});

		it('should call the set method of ionic/storage with the passed values', () => {
			localStorageService.setValue('Test', 'Bed')
				.then(() => {
					expect(storage.set).toHaveBeenCalledWith('Test', 'Bed');
				});
		});

		it('should return true if the value is set into storage successfully', () => {
			localStorageService.setValue('Test', 'Bed')
				.then((retVal) => {
					expect(retVal).toBeTruthy();
				});
		});

		xit('should return false if the value is not set into storage successfully', () => {
			storage.ready = jasmine.createSpy('ready', () => {}).and.returnValue(Promise.resolve());
			storage.set = jasmine.createSpy('set', () => {}).and.returnValue(Promise.reject(false));
			console.debug(storage.set);
			localStorageService.setValue('Test', 'Bed')
				.catch((retVal) => {
					console.debug(JSON.stringify(retVal));
					expect(retVal).toBeTruthy();
				});
		});
	});

	describe('getValue method', () => {
		it('should be defined', () => {
			expect(localStorageService.getValue).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof localStorageService.getValue).toEqual('function');
		});

		it('should check to see if storage is ready', () => {
			localStorageService.getValue('Test');
			expect(storage.ready).toHaveBeenCalled();
		});

		it('should call the get method of ionic/storage with the passed value', () => {
			localStorageService.getValue('Test')
				.then(() => {
					expect(storage.get).toHaveBeenCalledWith('Test');
				});
		});

		it('should return the stored value that matches the passed key', () => {
			localStorageService.getValue('Test')
				.then((retVal) => {
					expect(retVal).toEqual('Bed');
				});
		});
	});
});