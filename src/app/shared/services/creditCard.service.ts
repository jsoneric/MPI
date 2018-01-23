import {Injectable} from '@angular/core';

import {HttpRequestObject} from "../classes/httpRequest.class";
import {HttpService} from "./http.service";
import {LoggingService} from "./logging.service";
import {CreditCard} from "../interfaces/creditCard.interface";
import {CreditCardType} from "../interfaces/creditCardType.interface";
import {CreditCardTypes} from "../../../assets/constants";

@Injectable()
export class CreditCardService {
	private body = new HttpRequestObject();
	private cards: CreditCard[] = [];
	private baseUrl:string = '/creditcards';
	private merchantInfo = {};
	constructor(private httpService: HttpService, private loggingService: LoggingService){}

	cardList():Promise<CreditCard[]> {
		if(this.cards.length){
			return Promise.resolve(this.cards);
		} else {
			this.body.url = this.baseUrl;
			return this.httpService.load(this.body)
				.then((resp) => {
					this.cards = this.buildCardArray(resp.cards);
					return this.cards;
				})
				.catch((err) => {
					this.loggingService.info('Error loading card list: ' + JSON.stringify(err));
					return err;
				});
		}
	}

	//TODO: The server does not support PUT verb at this time. Once it does, this method will need to be rewritten
	saveCard(theCard: CreditCard):Promise<any>{
		//save it to our server
		//console.debug('CreditCardService.saveCard method');
		this.body.data = theCard;
		this.body.url = `${this.baseUrl}/${theCard.cc_storage_id}`;
		return this.httpService.create(this.body)
			.then((resp) => {
				//console.debug('response from server: ' + JSON.stringify(resp));
				if(resp.success){
					let checkArray: CreditCard[] = [];
					checkArray = this.cards.filter((checkMe) => {
						return checkMe.cc_storage_id == theCard.cc_storage_id;
					});
					if(!checkArray.length){
						this.cards.push(resp.card);
					}
					return {success:resp.success, cards:this.cards};
				} else {
					return resp;
				}
			})
			.catch((err) => {
				//console.debug('error thrown: ' + JSON.stringify(err));
				this.loggingService.info('Error saving a card: ' + JSON.stringify(err));
			});
	}

	//TODO: The server does not support the DELETE verb at this time. Once it does, this method needs to be rewritten
	removeCard(theCard: CreditCard): Promise<any> {
		this.body.url = `${this.baseUrl}/${theCard.cc_storage_id}/delete`;
		this.body.data = theCard;
		return this.httpService.load(this.body)
			.then((resp) => {
				this.cards = this.cards.filter((thisCard) => {
					return thisCard.cc_storage_id !== theCard.cc_storage_id;
				});
				return resp;
			})
			.catch((err) => {
				this.loggingService.info('Error removing a card: ' + JSON.stringify(err));
				return Promise.reject(err);
			});
	}

	newCard(): CreditCard {
		let newCard = <CreditCard>{};
		newCard.cc_storage_id = 0;
		return newCard;
	}

	merchant():any{
		return this.merchantInfo;
	}

	loadMerchantInfo():Promise<any>{
		this.body.url = '/cart/merchant';
		return this.httpService.load(this.body)
			.then((resp) => {
				if(resp.success){
					this.merchantInfo = resp.merchant;
					return Promise.resolve();
				} else {
					return Promise.reject(resp.msg);
				}
			})
			.catch((err) => {
				return Promise.reject(err.msg);
			});
	}

	getCardType(cardTypeValue:number):CreditCardType
	getCardType(cardTypeValue:string):CreditCardType
	getCardType(cardTypeValue:any): CreditCardType {
		let result:CreditCardType[] = [];
		if(typeof cardTypeValue == 'string'){
			result = CreditCardTypes.filter((thisType) => {
				return thisType.name.toLowerCase() == cardTypeValue.toLowerCase();
			});
		} else {
			result = CreditCardTypes.filter((thisType) => {
				return thisType.cc_type_id == cardTypeValue;
			});
		}
		return result[0];
	}

	private notInitialized(theCard: CreditCard): boolean {
		return theCard.cc_storage_id === 0;
	}

	private buildCardArray(rawData: object): CreditCard[] {
		let retVal: CreditCard[] = [];

		for (let thisCard in rawData) {
			retVal.push(<CreditCard>rawData[thisCard]);
		}

		return retVal;
	}
}