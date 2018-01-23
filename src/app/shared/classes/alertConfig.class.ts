export class AlertConfigClass{
	title?:string;
	subTitle?:string;
	message?:string;
	cssClass?:string;
	inputs?:Array<AlertInputConfigClass> = [];
	buttons?:Array<AlertButtonConfigClass> = [];
	enableBackdropDismiss?:boolean = true;
}

export class AlertInputConfigClass{
	type:string;
	name:string;
	placeholder?:string;
	value?:string;
	label?:string;
	checked?:boolean = false;
	id:string;
}

export class AlertButtonConfigClass{
	text:string;
	handler?:any;
	cssClass?:string;
	role?:string = 'null';
}