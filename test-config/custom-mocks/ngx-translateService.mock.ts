export class TranslateServiceMock {
	public static instance(): any {

		let instance = jasmine.createSpyObj('TranslateService', [
			'currentLang',
			'currentLoader',
			'onLangChange',
			'onTranslationChange',
			'onDefaultLangChange',
			'setDefaultLang',
			'getDefaultLang',
			'use',
			'getTranslation',
			'setTranslation',
			'addLangs',
			'getLangs',
			'get',
			'stream',
			'instant',
			'set',
			'reloadLang',
			'resetLang',
			'getBrowserLang',
			'getBrowserCultureLang'
		]);

		return instance;
	}
}