export class FormControlMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('FormControl', [
			'setValue',
			'patchValue',
			'reset',
			'registerOnChange',
			'registerOnDisabledChange',
			'value'
		]);

		instance.value.and.returnValue('');

		return instance;
	}
}