import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import {Page} from "ionic-angular/navigation/nav-util";
import {List} from 'ionic-angular/components/list/list';
import {TranslateService} from "@ngx-translate/core";

import {AddAuthorizedotnetCardComponent} from "./authorizedotnet/add-authorizedotnet-card/add-authorizedotnet-card.component";
import {AddPaymentusCardComponent} from "./paymentus/add-paymentus-card/add-paymentus-card.component";
import {AddSpreedlyCardComponent} from "./spreedly/add-spreedly-card/add-spreedly-card.component";
import {EditAuthorizedotnetCardComponent} from "./authorizedotnet/edit-authorizedotnet-card/edit-authorizedotnet-card.component";
import {EditPaymentusCardComponent} from "./paymentus/edit-paymentus-card/edit-paymentus-card.component";
import {EditSpreedlyCardComponent} from "./spreedly/edit-spreedly-card/edit-spreedly-card.component";
import {MessagingService} from "../shared/services/messaging.service";
import {CreditCard} from "../shared/interfaces/creditCard.interface";
import {CreditCardService} from "../shared/services/creditCard.service";
import {AlertButtonConfigClass} from '../shared/classes/alertConfig.class';

@IonicPage()
@Component({
  selector: 'pbm-credit-cards',
  templateUrl: 'credit-cards.component.html'
})
export class CreditCardsComponent {
	@ViewChild(Content) content: Content;
	@ViewChild(List) list: List;
  public cards : CreditCard[] = [];

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private messagingService: MessagingService, private creditCardService: CreditCardService, private translationService: TranslateService) {}

	ionViewWillEnter(): Promise<any> {
		return this.creditCardService.cardList()
			.then((resp) => {
				this.cards = resp;
				//TODO: When ionic fixes the refresh problem that happens after adding an item to a list we should probably remove this.
				//See this issue: https://github.com/ionic-team/ionic/issues/13028
				this.content.resize();
			})
			.catch((err) => {
				this.messagingService.alertConfig.title = this.translationService.instant('ALERTS.TITLES.ERROR');
				this.messagingService.raiseAlert(this.translationService.instant('CREDITCARDS.ALERTS.LOADPROBLEM') + err.msg);
			});
    }

	public addNewCard() {
		switch(this.creditCardService.merchant().name.toLowerCase()){
		    case 'authorize.net':
			    this.navigateTo(AddAuthorizedotnetCardComponent);
		        break;
		    case 'paymentus':
			    this.navigateTo(AddPaymentusCardComponent);
		        break;
		    default: //spreedly
			    this.navigateTo(AddSpreedlyCardComponent);
			    break;
		}
	}

	public editCard(theCard:CreditCard) {
	  switch(this.creditCardService.merchant().name.toLowerCase()){
		  case 'authorize.net':
			  this.navigateTo(EditAuthorizedotnetCardComponent, {'theCard': theCard});
			  break;
		  case 'paymentus':
			  this.navigateTo(EditPaymentusCardComponent, {'theCard': theCard});
			  break;
	    default: //spreedly
		    this.navigateTo(EditSpreedlyCardComponent, {'theCard': theCard});
		    break;
		}
	}

    private navigateTo(gatewayPage: Page, args?){
  	    this.navCtrl.push(gatewayPage, args);
	}
	
	deleteCard(theCard:CreditCard):Promise<any> {
		let yesButton = new AlertButtonConfigClass();
		let noButton = new AlertButtonConfigClass();
	    yesButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.YES');
	    noButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.NO');
		yesButton.handler = () => {
			return this.creditCardService.removeCard(theCard)
				.then((resp) => {
					if(resp.success){
			            return this.creditCardService.cardList()
			                .then((resp) => {
								this.cards = resp;
								this.content.resize();
			                })
			            }
				})
				.catch((err) => {
					let okButton = new AlertButtonConfigClass();
					okButton.text = this.translationService.instant('CREDITCARDS.BUTTONS.OK');
					return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROBLEM'), [okButton]);
				});
    };

    return this.messagingService.raiseConfirm(this.translationService.instant('CREDITCARDS.ALERTS.DELETEPROMPT') + theCard.alias + '?', [yesButton, noButton])
      .then((resp) => {
        this.list.closeSlidingItems();
      });
	}	  
}