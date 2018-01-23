import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {IonicPage, NavController, Events} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {UserClass} from "../shared/classes/user.class";
import {LoggingService} from "../shared/services/logging.service";
import {MessagingService} from "../shared/services/messaging.service";
import {ListService} from "../shared/services/list.service";
import {CreditCardService} from "../shared/services/creditCard.service";

import {ForgotComponent} from '../forgot/forgot.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {ParkComponent} from '../park/park.component';

@IonicPage()
@Component({
  selector: 'pbm-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  public login: FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private userClass: UserClass,
              private loggingService: LoggingService,
              private messagingService: MessagingService,
              private listService: ListService,
              private creditCardService: CreditCardService,
              private translateService: TranslateService,
              public events: Events
        ) {
    this.login = this.formBuilder.group({
      j_username: ['', Validators.compose([Validators.minLength(4),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
      j_password: ['', Validators.compose([Validators.minLength(4),Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9!@#$%^&*() ]*'), Validators.required])]
    });
  }

  attemptLogin(): Promise<any> {
  	return this.userClass.login(this.login)
	    .then((resp) => {
  		    if(resp.success){
            this.loggingService.info('Login successful');
            this.events.publish('user:login', resp.owner);
		        this.listService.loadLists();
		        this.creditCardService.loadMerchantInfo()
			        .catch((err) => {
				        this.messagingService.alertConfig.title = this.translateService.instant('LOGIN.MERCHANTERROR');
				        this.messagingService.raiseAlert(err);
			        });
		        this.navCtrl.setRoot(ParkComponent);
	        } else {
		        this.loggingService.info('Login failed: ' + this.userClass.message);
		        this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
		        this.messagingService.raiseAlert(this.userClass.message);
	        }
	    })
	    .catch(() => {
		    this.loggingService.info('Login failed: ' + this.userClass.message);
		    this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
		    this.messagingService.raiseAlert(this.userClass.message);
	    });
  }

  forgotPassword() {
    this.navCtrl.push(ForgotComponent);
  }

  signUpAccount() {
    this.navCtrl.push(SignUpComponent);
  }
}