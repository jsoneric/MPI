import { Injectable } from '@angular/core';
//import { CloudSettings } from '@ionic/cloud-angular';
import { IsDebug } from "@ionic-native/is-debug";

import 'rxjs/add/operator/map';

import { LocalStorageService } from "./localStorage.service"

@Injectable()
export class ConfigurationService {

	// private cloudSettings: CloudSettings = {
	// 	'core': {
	// 		'app_id': 'b7d71c79'
	// 	}
	// };
	private isDebug : boolean = false;
	private spinner : string = "crescent";
	private logLevel: number = 1;

	constructor(private isDebugObject: IsDebug, private localStorageService: LocalStorageService) {
		this.isDebugObject.getIsDebug()
			.then(
				(isDebug: boolean) => {
					this.isDebug = isDebug;
				}
			)
			.catch((error: any) => {
			})
	}

	// public getCloudSettings() : CloudSettings {
	// 	return this.cloudSettings;
	// }

	public getSpinner() : string {
		return this.spinner;
	}

	public getIsDebug() : boolean {
		return this.isDebug;
	}

	public getLogLevel() : number {
		return this.logLevel;
	}

	//TODO: We should probably return a boolean value here and act accordingly on the calling end
	public setLogLevel(newLevel: number): void {
		this.localStorageService.setValue('logLevel', newLevel.toString())
			.then(() => {
				this.logLevel = newLevel;
			});
	}
}