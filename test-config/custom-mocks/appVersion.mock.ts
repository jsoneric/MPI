export class AppVersionMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('AppVersion', [
			'getAppName',
			'getPackageName',
			'getVersionCode',
			'getVersionNumber'
		]);

		instance.getAppName.and.returnValue(Promise.resolve());
		instance.getPackageName.and.returnValue(Promise.resolve());
		instance.getVersionCode.and.returnValue(Promise.resolve());
		instance.getVersionNumber.and.returnValue(Promise.resolve());

		return instance;
	}
}