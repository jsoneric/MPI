import {FormGroupMock} from "./formGroup.mock";
import {FormControlMock} from "./formControl.mock";

export class FormBuilderMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('FormBuilder', [
			'group',
			'control',
			'array'
		]);

		return instance;
	}
}