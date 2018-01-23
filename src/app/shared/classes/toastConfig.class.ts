export class ToastConfigClass{
	message:string;
	duration?:number = 15000;
	position?:string = 'middle';
	cssClass?:string;
	showCloseButton?:boolean = true;
	closeButtonText?:string = 'Close';
	dismissOnPageChange?:boolean = true;
}