import {AlertController, ToastController} from "ionic-angular";
import {AlertControllerMock, ToastControllerMock} from "ionic-mocks";

import {MessagingService} from "./messaging.service";
import {ToastConfigClass} from "../classes/toastConfig.class";
import {AlertConfigClass, AlertButtonConfigClass, AlertInputConfigClass} from "../classes/alertConfig.class";

describe('Messaging Service', () => {
	let alertController: AlertController;
	let toastController: ToastController;
	let toastConfig: ToastConfigClass;
	let alertConfig: AlertConfigClass;
	let testButton: AlertButtonConfigClass;
	let testInput: AlertInputConfigClass;

	let messagingService: MessagingService;

	beforeEach(() => {
		alertController = AlertControllerMock.instance();
		toastController = ToastControllerMock.instance();

		messagingService = new MessagingService(toastController, alertController);
	});

	describe('raiseToast method', () => {
		it('should be defined', () => {
			expect(messagingService.raiseToast).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof messagingService.raiseToast).toEqual('function');
		});

		it('should call the create method of toastController when just a string is passed', () => {
			messagingService.raiseToast('blah');
			expect(toastController.create).toHaveBeenCalled();
		});

		it('should call the create method of alertController when a config class is passed', () => {
			toastConfig = new ToastConfigClass();
			toastConfig.message = 'Blarg';
			messagingService.raiseToast(toastConfig);
			expect(toastController.create).toHaveBeenCalled();
		});

		xit('should accept a function as the second argument', () => {
			let cb = () => {};
			messagingService.raiseToast('blah', cb);
			expect(toastController.create).toHaveBeenCalled();
		});
	});

	describe('raiseAlert method', () => {
		it('should be defined', () => {
			expect(messagingService.raiseAlert).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof messagingService.raiseAlert).toEqual('function');
		});

		it('should call the create method of alertController when just a string is passed', () => {
			messagingService.raiseAlert('blah');
			expect(alertController.create).toHaveBeenCalled();
		});

		it('should call the create method of alertController when a config class is passed', () => {
			alertConfig = new AlertConfigClass();
			alertConfig.title = 'Blarg';
			messagingService.raiseAlert(alertConfig);
			expect(alertController.create).toHaveBeenCalled();
		});
	});

	describe('raiseConfirm method', () => {
		it('should be defined', () => {
			expect(messagingService.raiseConfirm).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof messagingService.raiseConfirm).toEqual('function');
		});

		it('should call the create method of AlertController when a string and button array are passed', () => {
			testButton = new AlertButtonConfigClass();
			testButton.text = 'Blah';
			messagingService.raiseConfirm('Test', [testButton])
				.then(() => {
					expect(alertController.create).toHaveBeenCalled();
				});
		});

		it('should call the create method of AlertController when an AleftConfig and button array are passed', () => {
			testButton = new AlertButtonConfigClass();
			testButton.text = 'Blah';
			alertConfig = new AlertConfigClass();
			alertConfig.title = 'Blarg';
			messagingService.raiseConfirm(alertConfig, [testButton])
				.then(() => {
					expect(alertController.create).toHaveBeenCalled();
				});
		});
	});
});