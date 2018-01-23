import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NavController, NavParams, Content} from "ionic-angular";
import {NavControllerMock} from "../../../test-config/custom-mocks/navController.mock";
import {NavParamsMock, ContentMock} from "ionic-mocks";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {CreditCardService} from "../shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../../test-config/custom-mocks/creditCard.service.mock";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

import {CreditCardsComponent} from "./credit-cards.component";
import {CreditCard} from "../shared/interfaces/creditCard.interface";
import {CreditCardType} from "../shared/interfaces/creditCardType.interface";

describe('Credit Cards Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[CreditCardsComponent],
				imports:[TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					{provide:NavParams, useClass:NavParamsMock},
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:CreditCardService, useClass:CreditCardServiceMock},
					{provide:Content, useClass:ContentMock},
					TranslateService
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			}).compileComponents();
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(CreditCardsComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof CreditCardsComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let navParams:NavParams;
		let messagingService:MessagingService;
		let creditCardService: CreditCardService;
		let translateService: TranslateService;
		let content:Content;
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

		let creditCardComponent:CreditCardsComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			navParams = NavParamsMock.instance();
			messagingService = MessagingServiceMock.instance();
			creditCardService = CreditCardServiceMock.instance();
			content = ContentMock.instance();
			translateService = TranslateServiceMock.instance();

			creditCardComponent = new CreditCardsComponent(navController, navParams, messagingService, creditCardService, translateService);
		});

		describe('addNewCard method', () => {
			it('should be defined', () => {
				expect(creditCardComponent.addNewCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardComponent.addNewCard).toEqual('function');
			});

			it('should try to push a new component onto the navigation when called', () => {
				creditCardService.merchant = jasmine.createSpy('merchant', () => {}).and.returnValue({name:''});
				creditCardComponent.addNewCard();
				expect(navController.push).toHaveBeenCalled();
			});
		});

		describe('editCard method', () => {
			it('should be defined', () => {
				expect(creditCardComponent.editCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardComponent.editCard).toEqual('function');
			});

			it('should try to push a new component onto the navigation when called', () => {
				creditCardService.merchant = jasmine.createSpy('merchant', () => {}).and.returnValue({name:''});
				creditCardComponent.editCard(testCard);
				expect(navController.push).toHaveBeenCalled();
			});
		});

		describe('ionViewWillEnter method', () => {
			it('should be defined', () => {
				expect(creditCardComponent.ionViewWillEnter).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof creditCardComponent.ionViewWillEnter).toEqual('function');
			});

			it('should call the cardList method of CreditCardService when called', () => {
				creditCardService.cardList = jasmine.createSpy('cardList', () => {}).and.returnValue(Promise.resolve({success:true,cards:[]}));
				creditCardComponent.ionViewWillEnter()
					.then(() => {
						expect(creditCardService.cardList).toHaveBeenCalled();
					});
			});

			it('should handle errors returned by CreditCardService when they happen', () => {
				creditCardService.cardList = jasmine.createSpy('cardList', () => {}).and.returnValue(Promise.reject({msg:'failed'}));
				creditCardComponent.ionViewWillEnter()
					.catch((err) => {
						expect(err).toContain('failed');
					});
			});

			it('should assign the value returned by CreditCardService.loadCards to the local variable', () => {
				creditCardService.cardList = jasmine.createSpy('cardList', () => {}).and.returnValue(Promise.resolve([testCard]));
				creditCardComponent.ionViewWillEnter()
					.then(() => {
						expect(creditCardComponent.cards.length).toEqual(1);
					});
			});
		});
	});
});