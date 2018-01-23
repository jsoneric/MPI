export class ListServiceMock{
	public static instance(): any {
		let instance = jasmine.createSpyObj('listService', [
			'loadLists'
		]);

		return instance;
	}
}