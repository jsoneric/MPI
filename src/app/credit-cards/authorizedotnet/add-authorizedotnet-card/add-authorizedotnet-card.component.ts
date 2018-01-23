import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController} from 'ionic-angular';
import {CardIO} from "@ionic-native/card-io";
import {TranslateService} from "@ngx-translate/core";

import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {MessagingService} from "../../../shared/services/messaging.service";
import {CreditCardType} from "../../../shared/interfaces/creditCardType.interface";
import {CreditCardTypes} from "../../../../assets/constants";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";
import {ToastConfigClass} from "../../../shared/classes/toastConfig.class";

@Component({
  selector: 'pbm-add-authorizedotnet-card',
  templateUrl: 'add-authorizedotnet-card.component.html'
})
export class AddAuthorizedotnetCardComponent {
	public creditCard: CreditCard;
	public creditCardForm: FormGroup;
	public cardTypes = CreditCardTypes;
	public ccExpirationDate = {'month': 0, 'year': 0};
	constructor(
		public navCtrl: NavController,
		private formBuilder: FormBuilder,
		private creditCardService: CreditCardService,
		private messagingService: MessagingService,
		private cardIO: CardIO,
		private translationService: TranslateService) {
		this.creditCard = this.creditCardService.newCard();
		this.creditCardForm = this.formBuilder.group({
			'alias':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_first_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*')])],
			'billing_last_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_zip':['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[a-zA-Z0-9]*')])],
			'cc_mask':['', Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(16), Validators.pattern('^[0-9]*')])],
			'cc_exp_date':['', Validators.compose([Validators.required])],
			'cvv':['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4), Validators.pattern('^[0-9]*')])]
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

	setExpirationDate(e){
		this.ccExpirationDate = e;
	}

	save(): Promise<any> {
		console.debug('Form is valid: ' + this.creditCardForm.valid);
		if(this.creditCardForm.pristine){
			console.debug('add credit card form is pristine');
			return this.navCtrl.pop();
		} else if(this.creditCardForm.valid) {
			this.creditCard.alias = this.creditCardForm.get('alias').value;
			this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
			this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
			this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
			this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
			this.creditCard.cc_exp_month = this.ccExpirationDate.month;
			this.creditCard.cc_exp_year = this.ccExpirationDate.year;
			console.debug('passing to service');
			return this.creditCardService.saveCard(this.creditCard)
				.then((resp) => {
					if(resp.success){
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
		} else {
			console.debug('validity of alias: ' + this.creditCardForm.get('alias').valid);
			console.debug('validity of billing_first_name: ' + this.creditCardForm.get('billing_first_name').valid);
			console.debug('validity of billing_last_name: ' + this.creditCardForm.get('billing_last_name').valid);
			console.debug('validity of billing_zip: ' + this.creditCardForm.get('billing_zip').valid);
			console.debug('validity of cc_type: ' + this.creditCardForm.get('cc_type').valid);
			console.debug('validity of cc_exp_date: ' + this.creditCardForm.get('cc_exp_date').valid);
			console.debug('validity of cc_mask: ' + this.creditCardForm.get('cc_mask').valid);
			console.debug('validity of cvv: ' + this.creditCardForm.get('cvv').valid);
			//console.debug('validity of : ' + this.creditCardForm.get('').valid);
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

	scan():Promise<any> {
		let options = {
			requireExpiry:true,
			requirePostalCode:true,
			scanExpiry:true
		};
		return this.cardIO.canScan()
			.then((resp) => {
				if(resp){
					return this.cardIO.scan(options)
						.then((resp) => {
							this.creditCard.card_mask = resp.cardNumber;
							this.creditCard.cc_exp_month = resp.expiryMonth;
							this.creditCard.cc_exp_year = resp.expiryYear;
							let thisCardType:CreditCardType = this.creditCardService.getCardType(resp.cardType);
							this.creditCard.cc_type_id = thisCardType.cc_type_id;
							// this.creditCard.billing_first_name = resp.cardholderName.substring(0, resp.cardholderName.indexOf(' '));
							// this.creditCard.billing_last_name = resp.cardholderName.substring(resp.cardholderName.indexOf(' ') + 1);
							this.creditCard.billing_zip = resp.postalCode;
							this.creditCardForm.markAsDirty();
						});
				}
			});
	}
}