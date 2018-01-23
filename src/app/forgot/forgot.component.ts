import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {IonicPage, NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {UserClass} from "../shared/classes/user.class";
import {LoggingService} from "../shared/services/logging.service";
import {MessagingService} from "../shared/services/messaging.service";

@IonicPage()
@Component({
  selector: 'pbm-forgot',
  templateUrl: 'forgot.component.html'
})
export class ForgotComponent {
	private dismissFunction = ()=> {
		this.backToLogin();
	};

  public forgot : FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private messagingService: MessagingService, private userClass: UserClass, private loggingService: LoggingService, private translationService: TranslateService) {
    this.forgot = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(4),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])]
    });
	}

  resetPassword():Promise<any> {
  	return this.userClass.resetPassword(this.forgot)
	    .then((result) => {
		    if(result.success){
			    this.loggingService.info('Successful password reset');
			    return this.messagingService.raiseToast(result.msg, this.dismissFunction);
		    } else {
		    	this.loggingService.info('Unsuccessful password reset');
		    	this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
		    	return this.messagingService.raiseAlert(this.translationService.instant('FORGOT.ERRORMESSAGES.RESETERROR') + result.msg);
		    }
	    })
	    .catch((err) => {
		    this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
		    return this.messagingService.raiseAlert(this.translationService.instant('FORGOT.ERRORMESSAGES.RESETFATALERROR') + err.msg);
	    });
  }

	backToLogin() {
		this.navCtrl.pop();
	}
}