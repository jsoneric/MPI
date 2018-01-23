import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {MessagingService} from "../../../shared/services/messaging.service";
import {CreditCardTypes} from "../../../../assets/constants";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";
import {ToastConfigClass} from "../../../shared/classes/toastConfig.class";

@Component({
  selector: 'pbm-edit-paymentus-card',
  templateUrl: 'edit-paymentus-card.component.html'
})
export class EditPaymentusCardComponent {
	public creditCard: CreditCard;
	public creditCardForm: FormGroup;
	public cardTypes = CreditCardTypes;
	public ccExpirationDate = {'month': 0, 'year': 0};
	constructor(

		public navCtrl: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		private creditCardService: CreditCardService,
		private messagingService: MessagingService,
		private translationService: TranslateService
		) {
		this.creditCard = this.navParams.get('theCard');
		this.creditCardForm = this.formBuilder.group({
			'alias':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_first_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]*')])],
			'billing_last_name':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])],
			'billing_zip':['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[a-zA-Z0-9]*')])],
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

	save(){
		if(this.creditCardForm.pristine){
			return this.navCtrl.pop();
		} else if(this.creditCardForm.valid) {
			this.creditCard.alias = this.creditCardForm.get('alias').value;
			this.creditCard.billing_zip = this.creditCardForm.get('billing_zip').value;
			this.creditCard.cc_type_id = this.creditCardForm.get('cc_type').value;
			this.creditCard.card_mask = this.creditCardForm.get('cc_mask').value;
			this.creditCard.cc_exp_month = this.ccExpirationDate.month;
			this.creditCard.cc_exp_year = this.ccExpirationDate.year;
			this.creditCard.billing_first_name = this.creditCardForm.get('billing_first_name').value;
			this.creditCard.billing_last_name = this.creditCardForm.get('billing_last_name').value;
			this.creditCardService.saveCard(this.creditCard)
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
		}
	}

	deleteCard(): Promise<any>{
		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
		yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
		yesButton.handler = () => {
			return this.creditCardService.removeCard(this.creditCard)
				.then((resp) => {
					if(resp.success){
						return this.creditCardService.cardList();
					}
				})
				.then(() => {
					return this.navCtrl.pop();
				})
				.catch((err) => {
					this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
					return this.messagingService.raiseAlert(err.msg);
				});
		};
		noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
		return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT'), [yesButton, noButton])
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
}