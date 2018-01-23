export class LocalStorageServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('LocalStorageService', [
			'setValue',
			'getValue'
		]);

		instance.setValue.and.returnValue(Promise.resolve());
		instance.getValue.and.returnValue(Promise.resolve());

		return instance;
	}
}