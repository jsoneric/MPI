export class HttpServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('HttpService', [
			'create',
			'update',
			'load',
			'remove'
		]);

		instance.create.and.returnValue(Promise.resolve());
		instance.update.and.returnValue(Promise.resolve());
		instance.load.and.returnValue(Promise.resolve());
		instance.remove.and.returnValue(Promise.resolve());

		return instance;
	}
}