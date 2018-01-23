import {FormControlMock} from "./formControl.mock";

export class FormGroupMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('FormGroup', [
			'controls',
			'registerControl',
			'addControl',
			'removeControl',
			'setControl',
			'contains',
			'setValue',
			'patchValue',
			'reset',
			'getRawValue',
			'get'
		]);

		return instance;
	}
}