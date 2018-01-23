export class NavControllerMock {
	public static instance(): any {

		let instance = jasmine.createSpyObj('navController', [
			'push',
			'pop',
			'setRoot',
			'ionViewDidLoad',
			'ionViewWillEnter',
			'ionViewDidEnter',
			'ionViewWillLeave',
			'ionViewWillUnload',
			'ionViewCanEnter',
			'ionViewCanLeave'
		]);

		instance.push.and.returnValue(Promise.resolve());
		instance.pop.and.returnValue(Promise.resolve());
		instance.setRoot.and.returnValue(Promise.resolve());
		instance.ionViewCanEnter.and.returnValue(true);
		instance.ionViewCanLeave.and.returnValue(true);

		return instance;
	}
}