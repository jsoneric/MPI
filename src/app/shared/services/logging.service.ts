import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
import {FormBuilder} from "@angular/forms";

import {HttpService} from "./http.service";
import {ConfigurationService} from "./configuration.service";
import {HttpRequestObject} from "../classes/httpRequest.class";

@Injectable()
export class LoggingService {
	private logglyToken : string = "6f7be5c8-12f1-4cb2-af9d-3548110ba846";
	private logglyTag: string = '/tag/MobilePay';
	private logglyURL : string = 'http://logs-01.loggly.com/inputs/' + this.logglyToken + this.logglyTag;
	private infoLog : any[] = [];

	//For the Logging Messages
	private body = {
		message: '',
		info: {},
		debug: {},
		verbose: {}
	};

	constructor(private httpService: HttpService,
	            private configuration : ConfigurationService,
	            private platform : Platform,
	            private app: AppVersion,
	            private formBuilder: FormBuilder) {
	}

	public info(message: string, logMessageToConsole?: boolean) {
		this.body.message = message;
		this.body.info = {
			window:this.platform.win(),
			document:this.platform.doc(),
			location:this.platform.win().location,
			url: this.platform.doc().URL,
			title: this.platform.doc().title,
			referrer: this.platform.doc().referrer,
			userAgent:this.platform.win().navigator.userAgent,
			language:this.platform.win().navigator.language,
			version: this.app.getVersionNumber(),
			characterSet: this.platform.doc().characterSet
		};
		if(this.configuration.getLogLevel() > 0){
			this.infoLog.push(this.body);
		}
		if(logMessageToConsole){
			console.debug(message);
		}
	}

	public debug(message: string, parameters?: string[], skipTransmit?: boolean) {
		let log = new HttpRequestObject();
		this.info(message);
		this.body.debug = {
			params: parameters
		};

		if(!skipTransmit){
			log.url = this.logglyURL;
			log.overrideBaseUrl = true;
			log.data = this.formBuilder.group({'debug':[this.body]});
			this.httpService.create(log);
			console.debug('***** DEBUG *****');
			console.debug(log);
		}
	}

	public verbose(message: string, parameters?: string[], dump?: Object) {
		let log = new HttpRequestObject();
		this.debug(message, parameters, true);
		this.body.verbose = {
			stackDump: dump
		};

		log.url = this.logglyURL;
		log.overrideBaseUrl = true;
		log.data = this.formBuilder.group({'verbose':[this.body]});
		this.httpService.create(log);
		console.debug('***** VERBOSE *****');
		console.debug(log);
	}
}