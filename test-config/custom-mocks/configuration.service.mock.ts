export class ConfigurationServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('HttpService', [
			'getLogLevel',
			'setLogLevel'
		]);

		return instance;
	}
}