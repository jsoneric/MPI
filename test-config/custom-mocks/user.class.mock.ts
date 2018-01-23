export class UserClassMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('userClass', [
			'isLoggedIn',
			'message',
			'vehicleList',
			'token',
			'addVehicle',
			'save',
			'load',
			'reload',
			'remove',
			'login',
			'signUp',
			'resetPassword'
		]);

		instance.isLoggedIn.and.returnValue(true);
		instance.message.and.returnValue('');
		instance.vehicleList.and.returnValue([]);
		instance.token.and.returnValue('ABC123');
		instance.save.and.returnValue(Promise.resolve());
		instance.load.and.returnValue(Promise.resolve());
		instance.reload.and.returnValue(Promise.resolve());
		instance.remove.and.returnValue(Promise.resolve());
		instance.login.and.returnValue(Promise.resolve());
		instance.signUp.and.returnValue(Promise.resolve());
		instance.resetPassword.and.returnValue(Promise.resolve());

		return instance;
	}

}