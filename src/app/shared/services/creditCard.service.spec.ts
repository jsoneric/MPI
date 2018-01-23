import {HttpService} from "./http.service";
import {HttpServiceMock} from "../../../../test-config/custom-mocks/http.service.mock";
import {LoggingService} from "./logging.service";
import {LoggingServiceMock} from "../../../../test-config/custom-mocks/logging.service.mock";
import {CreditCard} from "../interfaces/creditCard.interface";
import {HttpRequestObject} from "../classes/httpRequest.class";
import {CreditCardType} from "../interfaces/creditCardType.interface";

import {CreditCardService} from "./creditCard.service";

describe('CreditCard Service', () => {
	let httpService:HttpService;
	let loggingService: LoggingService;
	let httpRequestObject:HttpRequestObject;
	let testCard: CreditCard = {
		cc_storage_id:0,
		owner_id:0,
		alias:'',
		billing_first_name:'',
		billing_last_name:'',
		billing_address:'',
		billing_city:'',
		billing_state_id:'',
		billing_zip:'',
		cc_type_id:0,
		card_mask:'',
		cc_exp_month:0,
		cc_exp_year:0,
		cc_type:<CreditCardType>{}
	};

	let creditCardService: CreditCardService;

	beforeEach(() => {
		httpService = HttpServiceMock.instance();
		loggingService = LoggingServiceMock.instance();

		creditCardService = new CreditCardService(httpService, loggingService);
	});

	describe('methods', () => {
		describe('cardList method', () => {
			it('should be defined', () => {
				expect(creditCardService.cardList).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.cardList).toEqual('function');
			});

			it('should call the load method of HttpService when called and the internal array has no members', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve());
				creditCardService.cardList()
					.then(() => {
						expect(httpService.load).toHaveBeenCalled();
					})
			});

			it('should hand back the cards that are returned from the server as the return value', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, cards:[testCard]}));
				creditCardService.cardList()
					.then((resp) => {
						expect(resp).toContain(testCard);
					});
			});

			it('should hand back the stored card array if it is not empty instead of calling to the server', () => {
				testCard.billing_zip = '12345';
				httpService.create = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, card:testCard}));
				creditCardService.saveCard(testCard)
					.then(() => {
						return creditCardService.cardList();
					})
					.then((resp) => {
						expect(resp[0].billing_zip).toEqual('12345');
					});
			});
		});

		describe('saveCard method', () => {
			it('should be defined', () => {
				expect(creditCardService.saveCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.saveCard).toEqual('function');
			});

			it('should call the create method of HttpService', () => {
				httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, creditCard:testCard}));
				creditCardService.saveCard(testCard)
					.then(() => {
						expect(httpService.create).toHaveBeenCalled();
					});
			});

			it('should return the server error if one happens', () => {
				httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
				creditCardService.saveCard(testCard)
					.catch((resp) => {
						expect(resp.msg).toEqual('failed');
					});
			});
		});

		describe('removeCard method', () => {
			it('should be defined', () => {
				expect(creditCardService.removeCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.removeCard).toEqual('function');
			});

			it('should call the load method of HttpService when called', () => {
				testCard.cc_storage_id = 1;
				httpService.load = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, creditCard:testCard}));
				creditCardService.removeCard(testCard)
					.then(() => {
						expect(httpService.load).toHaveBeenCalled();
					});
			});

			it('should return the server error if one happens', () => {
				testCard.cc_storage_id = 1;
				httpService.load = jasmine.createSpy('create', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
				creditCardService.removeCard(testCard)
					.catch((resp) => {
						expect(resp.msg).toEqual('failed');
					});
			});

			// it('should remove the passed card from the stored card array', () => {
			// 	testCard.cc_storage_id = 1;
			// 	httpService.create = jasmine.createSpy('create', () => {}).and.returnValue(Promise.resolve({success:true, cards:[], card:testCard}));
			// 	httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, cards:[]}));
			// 	creditCardService.saveCard(testCard)
			// 		.then(() => {
			// 			return creditCardService.removeCard(testCard);
			// 		})
			// 		.then(() => {
			// 			return creditCardService.cardList();
			// 		})
			// 		.then((resp) => {
			// 			expect(resp.length).toEqual(0);
			// 		});
			// });
		});

		describe('newCard method', () => {
			it('should be defined', () => {
				expect(creditCardService.newCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.newCard).toEqual('function');
			});

			it('should return an uninitialized creditCard when called', () => {
				expect(creditCardService.newCard().cc_storage_id).toEqual(0);
			});
		});

		describe('getCardType method', () => {
			it('should be defined', () => {
				expect(creditCardService.getCardType).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.getCardType).toEqual('function');
			});

			it('should return a CreditCardType when passed a string that matches a known card name value', () => {
				expect(creditCardService.getCardType('Visa').cc_type_id).toEqual(1);
			});

			it('should return a CreditCardType when passed a number that matches a known card type id value', () => {
				expect(creditCardService.getCardType(2).name).toEqual('MC');
			});
		});

		describe('loadMerchantInfo method', () => {
			it('should be defined', () => {
				expect(creditCardService.loadMerchantInfo).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.loadMerchantInfo).toEqual('function');
			});

			it('should call the load method of httpService when called', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, merchant:{}}));
				creditCardService.loadMerchantInfo()
					.then(() => {
						expect(httpService.load).toHaveBeenCalled();
					});
			});
		});

		describe('merchant method', () => {
			it('should be defined', () => {
				expect(creditCardService.merchant).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardService.merchant).toEqual('function');
			});

			it('should return an empty object before the merchant value is initialized', () => {
				expect(creditCardService.merchant()).toEqual({});
			});

			it('should return the stored value for the merchant data once it is initialized', () => {
				httpService.load = jasmine.createSpy('load', () => {}).and.returnValue(Promise.resolve({success:true, merchant:{name:'Spreedly'}}));
				creditCardService.loadMerchantInfo()
					.then(() => {
						expect(creditCardService.merchant()).toEqual({name:'Spreedly'});
					});
			});
		});
	});
});