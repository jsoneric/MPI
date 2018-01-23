export class CardIoMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('CardIO', [
			'canScan',
			'scan',
			'version'
		]);

		instance.canScan.and.returnValue(Promise.resolve());
		instance.scan.and.returnValue(Promise.resolve());
		instance.version.and.returnValue(Promise.resolve());

		return instance;
	}
}