export class LoggingServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('LoggingService', [
			'info',
			'debug',
			'verbose'
		]);

		instance.info.and.returnValue(() => {});
		instance.debug.and.returnValue(() => {});
		instance.verbose.and.returnValue(() => {});

		return instance;
	}
}