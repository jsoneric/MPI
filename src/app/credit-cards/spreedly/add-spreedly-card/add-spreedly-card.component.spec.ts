import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IonicModule, NavController} from "ionic-angular";
import {NavControllerMock} from "../../../../../test-config/custom-mocks/navController.mock";
import {FormBuilder} from "@angular/forms";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../../../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../../../test-config/custom-mocks/messaging.service.mock";
import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../../../../test-config/custom-mocks/creditCard.service.mock";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {CreditCardType} from "../../../shared/interfaces/creditCardType.interface";
import {HttpService} from "../../../shared/services/http.service";
import {LoggingService} from "../../../shared/services/logging.service";
import {LoggingServiceMock} from "../../../../../test-config/custom-mocks/logging.service.mock";
import {TranslateServiceMock} from "../../../../../test-config/custom-mocks/ngx-translateService.mock";

import {AddSpreedlyCardComponent} from "./add-spreedly-card.component";

let testCard: CreditCard = {
	cc_storage_id:1,
	alias:'',
	billing_zip:'',
	cc_type_id:1,
	card_mask:'',
	cc_exp_month:1,
	cc_exp_year:1,
	cc_type:<CreditCardType>{},
	owner_id:1,
	billing_first_name:'',
	billing_last_name:'',
	billing_address:'',
	billing_city:'',
	billing_state_id:''
};
class LocalNavParamsMock{
	data = {theCard:testCard};

	get(param){
		return this.data[param];
	}
}

describe('Add Spreedly Card Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[AddSpreedlyCardComponent],
				imports: [IonicModule.forRoot(AddSpreedlyCardComponent), TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					FormBuilder,
					{provide:MessagingService, useClass:MessagingServiceMock},
					CreditCardService,
					HttpService,
					HttpClient,
					HttpHandler,
					{provide: LoggingService, useClass: LoggingServiceMock},
					TranslateService
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			})
				.overrideTemplate(AddSpreedlyCardComponent, '<div><script>var Spreedly = {init:function(){},on:function(){}};</script></div>');
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(AddSpreedlyCardComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof AddSpreedlyCardComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let formBuilder: FormBuilder;
		let messagingService:MessagingService;
		let creditCardService: CreditCardService;
		let translationService: TranslateService;

		let addCreditCardComponent:AddSpreedlyCardComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			messagingService = MessagingServiceMock.instance();
			creditCardService = CreditCardServiceMock.instance();
			formBuilder = new FormBuilder();
			translationService = TranslateServiceMock.instance();

			addCreditCardComponent = new AddSpreedlyCardComponent(navController, formBuilder, creditCardService, messagingService, translationService);
		});

		describe('ionViewDidLoad method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.ionViewDidLoad).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.ionViewDidLoad).toEqual('function');
			});

			//TODO: Figure out how to test if the Spreedly functions were called
		});

		describe('save method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.save).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.save).toEqual('function');
			});

			it('should call the pop method of NavController when called and the form is not dirty', () => {
				addCreditCardComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});
		});

		describe('cancel method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.cancel).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.cancel).toEqual('function');
			});

			it('should call the raiseConfirm method of MessagingService when called and the form is dirty', () => {
				addCreditCardComponent.creditCardForm.markAsDirty();
				addCreditCardComponent.cancel()
					.then(() => {
						expect(messagingService.raiseConfirm).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when called and the form is not dirty', () => {
				addCreditCardComponent.cancel()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});
		});

		describe('showCVVInfo method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.showCVVInfo).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.showCVVInfo).toEqual('function');
			});

			it('should call the raiseToast method of MessagingService when called', () => {
				addCreditCardComponent.creditCard.cc_type_id = 2;
				addCreditCardComponent.showCVVInfo();
				expect(messagingService.raiseToast).toHaveBeenCalled();
			});
		});

		describe('setExpirationDate method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.setExpirationDate).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.setExpirationDate).toEqual('function');
			});

			it('should set the value of ccExpirationDate to the passed value', () => {
				addCreditCardComponent.setExpirationDate({month:1,year:1});
				expect(addCreditCardComponent.ccExpirationDate).toEqual({month:1,year:1});
			});
		});
	});
});