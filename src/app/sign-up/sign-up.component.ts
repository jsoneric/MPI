import {Component, Renderer} from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {IonicPage, NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {UserClass} from "../shared/classes/user.class";
import {LoggingService} from "../shared/services/logging.service";
import {MessagingService} from "../shared/services/messaging.service";
import {ListService} from "../shared/services/list.service";
import {ParkComponent} from './../park/park.component';

@IonicPage()
@Component({
  selector: 'pbm-sign-up',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent {
  public signup : FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private messagingService: MessagingService,
              private userClass: UserClass,
              private loggingService: LoggingService,
              private listService: ListService,
			  private translateService: TranslateService,
			  private renderer: Renderer
            ) {
	  this.signup = this.formBuilder.group({
		  first_name: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
		  last_name: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required])],
		  email: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(30), Validators.pattern("[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(.[a-zA-Z0-9]{2,3})+"), Validators.required])],
		  username: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
		  password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
		  confirm_password: ['', Validators.required],
  		}, {validator: this.confirmPasswordMatch('password', 'confirm_password')}); 
  }

  setAsTouched() {
	for (var controlName in this.signup.controls) {
		let elem = document.querySelector('[formControlName="'+controlName+'"]');

		if(elem) {
			this.renderer.setElementClass(elem.parentElement.parentElement.parentElement, 'ng-touched', this.signup.controls[controlName].touched);
		}
	}
  }

  confirmPasswordMatch(passwordKey: string, confirmPasswordKey: string) {
		return (group: FormGroup): {[key: string]: any} => {
			let password = group.controls[passwordKey];
			let confirmPassword = group.controls[confirmPasswordKey];

			if (password.value !== confirmPassword.value) {
				return {
					mismatchedPasswords: true
				};
			}
		}
	}


  signUpAccount():Promise<any> {
	  if(this.signup.get('password').value !== this.signup.get('confirm_password').value){
	  	this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.PASSWORDMATCH'));
	  	return;
	  }
	  return this.userClass.signUp(this.signup)
		  .then((resp) => {
			  if(resp.success){
				  this.loggingService.info('Successful signup');
				  this.messagingService.raiseToast(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGNUPSUCCESS'))
					  .then(() => {
				  	      this.listService.loadLists();
						  this.navCtrl.setRoot(ParkComponent);
					  });
			  } else {
				  this.loggingService.info('Unsuccessful signup');
				  this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGHUPPROBLEM') + resp.msg);
			  }
		  })
		  .catch((resp) => {
			  this.presentAlert(this.translateService.instant('SIGNUP.ALERTS.MESSAGES.SIGNUPSERVERPROBLEM') + resp.msg);
		  });
  }

  private presentAlert(message:string) {
  	this.messagingService.alertConfig.title = this.translateService.instant('ALERTS.TITLES.ERROR');
  	this.messagingService.raiseAlert(message);
  }
}
