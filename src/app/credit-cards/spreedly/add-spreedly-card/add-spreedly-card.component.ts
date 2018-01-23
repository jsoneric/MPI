import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {MessagingService} from "../../../shared/services/messaging.service";
import {CreditCardTypes} from "../../../../assets/constants";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";
import {ToastConfigClass} from "../../../shared/classes/toastConfig.class";

declare let Spreedly;

@Component({
  selector: 'pbm-add-spreedly-card',
  templateUrl: 'add-spreedly-card.component.html'
})
export class AddSpreedlyCardComponent {
	public creditCard: CreditCard;
	public creditCardForm: FormGroup;
	public cardTypes = CreditCardTypes;
	public ccExpirationDate = {'month': 0, 'year': 0};
	private additionalFields:any = {};
	constructor(
		public navCtrl: NavController,
		private formBuilder: FormBuilder,
		private creditCardService: CreditCardService,
		private messagingService: MessagingService,
		private translationService: TranslateService) {
		this.creditCard = this.creditCardService.newCard();
		this.creditCardForm = this.formBuilder.group({
			'alias':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_first_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*')])],
			'billing_last_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_zip':['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[a-zA-Z0-9]*')])],
			'cc_exp_date':['', Validators.compose([Validators.required])]
		});
	}

	ionViewDidLoad(){
		//console.debug('initializing Spreedly with environment key:' + this.creditCardService.merchant().environmentKey);
		Spreedly.init(this.creditCardService.merchant().environmentKey, {
			'numberEl':'spreedlyNumber',
			'cvvEl':'spreedlyCvv'
		});
		Spreedly.on('ready', function() {
			//console.log('Spreedly is ready for battle');
		});
		Spreedly.on('errors', function(errors) {
			for(var e = 0;e<errors.length;e++){
				console.error(errors[e]);
			}
		});
		Spreedly.on('validation', (inputProperties) => {
			//console.debug('Spreedly validation event handler');
			if(inputProperties.validNumber && inputProperties.validCvv){
				//console.debug('card is valid, cvv is valid, sending to tokenization');
				this.additionalFields.first_name = this.creditCardForm.get('billing_first_name').value;
				this.additionalFields.last_name = this.creditCardForm.get('billing_last_name').value;
				this.additionalFields.month = this.ccExpirationDate.month;
				this.additionalFields.year = this.ccExpirationDate.year;
				this.additionalFields.zip = this.creditCardForm.get('billing_zip').value;
				Spreedly.tokenizeCreditCard(this.additionalFields);
			} else {
				//console.debug('card or cvv not valid, returning error');
				let errMsg: string = '';
				if(!inputProperties.validNumber){
					errMsg += this.translationService.instant('CREDITCARDS.ALERTS.INVALIDCARDNUMBER');
				}
				if(!inputProperties.validCvv){
					errMsg += this.translationService.instant('CREDITCARDS.ALERTS.INVALIDCVV');
				}
				this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
				this.messagingService.raiseAlert(errMsg);
			}
		});
		Spreedly.on('paymentMethod', (token, paymentMethod) => {
			//console.debug('Spreedly paymentMethod handler');
			this.creditCard.payment_method_token = token;
			this.creditCard.card_mask = `${paymentMethod.first_six_digits}******${paymentMethod.last_four_digits}`;
			this.creditCard.payment_method_fingerprint = paymentMethod.fingerprint;
			//console.debug('tokenization complete, sending the card to our server');
			this.sendToServer();
		});
	}

	showCVVInfo() {
		let toastConfig = <ToastConfigClass>{
			message : this.cardTypes[this.creditCard.cc_type_id-1].cvvMessage,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: this.translationService.instant('CREDITCARDS.BUTTONS.OK'),
			dismissOnPageChange: true
		};

		return this.messagingService.raiseToast(toastConfig);
	}

	setExpirationDate(monthYear:any){
		this.ccExpirationDate = monthYear;
	}

	save(){
		// console.debug('validity of alias: ' + this.creditCardForm.get('alias').valid);
		// console.debug('validity of billing_first_name: ' + this.creditCardForm.get('billing_first_name').valid);
		// console.debug('validity of billing_last_name: ' + this.creditCardForm.get('billing_last_name').valid);
		// console.debug('validity of billing_zip: ' + this.creditCardForm.get('billing_zip').valid);
		// console.debug('validity of cc_exp_date: ' + this.creditCardForm.get('cc_exp_date').valid);

		if(this.creditCardForm.pristine){
			//console.debug('add credit card form is pristine');
			return this.navCtrl.pop();
		} else if(this.creditCardForm.valid) {
			//console.debug('Form is valid: ' + this.creditCardForm.valid);
			Spreedly.validate();
		}
	}

	cancel(): Promise<any> {
		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();

		yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
		yesButton.handler = () => {
			return this.navCtrl.pop();
		};

		noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');

		if(this.creditCardForm.dirty){
			this.messagingService.alertConfig.title = this.translationService.instant('CREDITCARDS.ALERTS.DISCARD');
			return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.PROMPTS.DISCARD'), [yesButton, noButton]);
		} else {
			return this.navCtrl.pop();
		}

	}

	private sendToServer():Promise<any>{
			this.creditCard.alias = this.creditCardForm.get('alias').value;
			this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
			this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
			this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
			this.creditCard.cc_exp_month = this.ccExpirationDate.month;
			this.creditCard.cc_exp_year = this.ccExpirationDate.year;
			//console.debug('passing to service');
			return this.creditCardService.saveCard(this.creditCard)
				.then((resp) => {
					if(resp.success){
						//console.debug('back from server with success');
						return this.navCtrl.pop();
					} else {
						this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
						return this.messagingService.raiseAlert(resp.msg);
					}
				})
				.catch((err) => {
					this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
					return this.messagingService.raiseAlert(err);
				});
	}
}