import {Injectable} from "@angular/core";
import {AlertController, Alert, ToastController, Toast} from "ionic-angular";

import {ToastConfigClass} from "../classes/toastConfig.class";
import {AlertConfigClass, AlertButtonConfigClass, AlertInputConfigClass} from "../classes/alertConfig.class";

@Injectable()
export class MessagingService{
	private alert : Alert;
	private toast : Toast;
	private dismissButton = new AlertButtonConfigClass();
	public toastConfig = new ToastConfigClass();
	public alertConfig = new AlertConfigClass();

	constructor(private toastController: ToastController, private alertController: AlertController){
		this.dismissButton.text = 'Dismiss';
	}

	raiseToast(config: ToastConfigClass, dismissFunction?: Function): Promise<any>;
	raiseToast(config: string, dismissFunction?:Function): Promise<any>;
	raiseToast(config, dismissFunction?): any{
		if(typeof config =='string'){
			this.toastConfig.message = config;
			this.toast = this.toastController.create(this.toastConfig);
		} else {
			this.toast = this.toastController.create(config);
		}

		if(dismissFunction){
			this.toast.onDidDismiss(dismissFunction);
		}
		return this.toast.present();
	}

	raiseAlert(config: AlertConfigClass): Promise<any>;
	raiseAlert(config: string): Promise<any>;
	raiseAlert(config): any{
		if(typeof config == 'string'){
			this.alertConfig.message = config;
			this.alert = this.alertController.create(this.alertConfig);
		} else {
			this.alert = this.alertController.create(config);
		}

		return this.alert.present();
	}

	raiseConfirm(config: AlertConfigClass, buttons: AlertButtonConfigClass[]): Promise<any>;
	raiseConfirm(config:string, buttons: AlertButtonConfigClass[]): Promise<any>
	raiseConfirm(config, buttons): any{
		this.alertConfig.buttons = buttons;
		if(typeof config == 'string'){
			this.alertConfig.message = config;
			this.alert = this.alertController.create(this.alertConfig);
		} else {
			this.alert = this.alertController.create(config);
		}

		return this.alert.present();
	}

	//TODO: Add a raisePrompt method
}