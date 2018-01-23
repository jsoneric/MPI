//Source: https://stackoverflow.com/questions/35826325/how-to-convert-input-value-to-uppercase-in-angular-2-value-passing-to-ngcontrol
//It's not the accepted answer. Look for the submission by subaru710.

import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
@Directive({
	selector: '[pbm-uppercase][ngModel]'
})
export class UppercaseDirective {
	@Output() ngModelChange: EventEmitter<any> = new EventEmitter();
	value: any;

	@HostListener('input', ['$event']) onInputChange($event) {
		this.value = $event.target.value.toUpperCase();
		this.ngModelChange.emit(this.value);
	}
}