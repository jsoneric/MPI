import {CreditCard} from "../../src/app/shared/interfaces/creditCard.interface";
import {CreditCardType} from "../../src/app/shared/interfaces/creditCardType.interface";

export class CreditCardServiceMock {
	public static instance(): any {
		let instance = jasmine.createSpyObj('CreditCardService', [
			'cardList',
			'saveCard',
			'removeCard',
			'newCard',
			'getCardType',
			'merchant',
			'loadMerchantInfo'
		]);

		instance.cardList.and.returnValue(Promise.resolve());
		instance.saveCard.and.returnValue(Promise.resolve());
		instance.removeCard.and.returnValue(Promise.resolve());
		instance.newCard.and.returnValue(() => {return <CreditCard>{};});
		instance.getCardType.and.returnValue(<CreditCardType>{});

		return instance;
	}
}