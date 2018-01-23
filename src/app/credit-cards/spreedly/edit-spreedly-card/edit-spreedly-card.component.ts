import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {MessagingService} from "../../../shared/services/messaging.service";
import {CreditCardTypes} from "../../../../assets/constants";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";

@Component({
  selector: 'pbm-edit-spreedly-card',
  templateUrl: 'edit-spreedly-card.component.html'
})
export class EditSpreedlyCardComponent {
	public creditCard: CreditCard;
	public creditCardForm: FormGroup;
	public cardTypes = CreditCardTypes;
	public ccExpirationDate: string = '';
	constructor(

		public navCtrl: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		private creditCardService: CreditCardService,
		private messagingService: MessagingService,
		private translationService: TranslateService
		) {
		console.debug('edit spreedly card component constructor');
		this.creditCard = this.navParams.get('theCard');
		console.debug('card assignment complete');
		this.creditCardForm = this.formBuilder.group({
			'alias':['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*')])]
		});
		console.debug('card form assignment complete');
		this.ccExpirationDate = this.creditCard.cc_exp_month + '/' + this.creditCard.cc_exp_year;
	}

	save(){
		if(this.creditCardForm.pristine){
			return this.navCtrl.pop();
		} else if(this.creditCardForm.valid) {
			this.creditCard.alias = this.creditCardForm.get('alias').value;
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
		return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT') + this.creditCard.alias + "?", [yesButton, noButton])
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