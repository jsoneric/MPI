export class MessagingServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('MessagingService', [
			'raiseToast',
			'raiseAlert',
			'raiseConfirm',
			'toastConfig',
			'alertConfig'
		]);

		instance.raiseToast.and.returnValue(Promise.resolve());
		instance.raiseAlert.and.returnValue(Promise.resolve());
		instance.raiseConfirm.and.returnValue(Promise.resolve());
		instance.toastConfig.and.returnValues({});
		instance.alertConfig.and.returnValues({});

		return instance;
	}
}