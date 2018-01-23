import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IonicModule, NavController, NavParams} from "ionic-angular";
import {NavControllerMock} from "../../../../../test-config/custom-mocks/navController.mock";
import {NavParamsMock} from "ionic-mocks";
import {FormBuilder} from "@angular/forms";
import {FormBuilderMock} from "../../../../../test-config/custom-mocks/formBuilder.mock";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../../../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../../../test-config/custom-mocks/messaging.service.mock";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";
import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../../../../test-config/custom-mocks/creditCard.service.mock";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {CreditCardType} from "../../../shared/interfaces/creditCardType.interface";
import {TranslateServiceMock} from "../../../../../test-config/custom-mocks/ngx-translateService.mock";

import {EditSpreedlyCardComponent} from "./edit-spreedly-card.component";

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

xdescribe('Edit Credit Card Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[EditSpreedlyCardComponent],
				imports: [IonicModule.forRoot(EditSpreedlyCardComponent), TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					{provide:NavParams, useClass: LocalNavParamsMock},
					FormBuilder,
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:CreditCardService, useClass:CreditCardServiceMock},
					TranslateService
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			})
				.overrideTemplate(EditSpreedlyCardComponent, '<div><script>var Spreedly = {init:function(){},on:function(){}};</script></div>');
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(EditSpreedlyCardComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof EditSpreedlyCardComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let navParams:NavParams;
		let formBuilder: FormBuilder;
		let messagingService:MessagingService;
		let creditCardService: CreditCardService;
		let translationService: TranslateService;

		let editCreditCardComponent:EditSpreedlyCardComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			navParams = jasmine.createSpyObj('NavParams', {get:{'theCard':testCard}});
			messagingService = MessagingServiceMock.instance();
			creditCardService = CreditCardServiceMock.instance();
			formBuilder = new FormBuilder();
			translationService = TranslateServiceMock.instance();

			editCreditCardComponent = new EditSpreedlyCardComponent(navController, navParams, formBuilder, creditCardService, messagingService, translationService);
		});

		describe('save method', () => {
			it('should be defined', () => {
				expect(editCreditCardComponent.save).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof editCreditCardComponent.save).toEqual('function');
			});

			it('should call the saveCard method of CreditCardService when called and the form is dirty', () => {
				editCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				editCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				editCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				editCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				editCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				editCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				editCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:true}));
				editCreditCardComponent.save()
					.then(() => {
						expect(creditCardService.saveCard).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when called and the form is not dirty', () => {
				editCreditCardComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when the server responds with success', () => {
				editCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				editCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				editCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				editCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				editCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				editCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				editCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:true}));
				editCreditCardComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});

			it('should call the raiseAlert method of MessagingService when the server responds with failure', () => {
				editCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				editCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				editCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				editCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				editCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				editCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				editCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
				editCreditCardComponent.save()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});

			it('should handle server errors when they are returned', () => {
				editCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				editCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				editCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				editCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				editCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				editCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				editCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.reject({msg:''}));
				editCreditCardComponent.save()
					.catch(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});
		});

		describe('deleteCard method', () => {
			it('should be defined', () => {
				expect(editCreditCardComponent.deleteCard).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof editCreditCardComponent.deleteCard).toEqual('function');
			});

			it('should call the raiseConfirm method of MessagingService when called', () => {
				editCreditCardComponent.deleteCard()
					.then(() => {
						expect(messagingService.raiseConfirm).toHaveBeenCalled();
					});
			});
		});

		describe('cancel method', () => {
			it('should be defined', () => {
				expect(editCreditCardComponent.cancel).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof editCreditCardComponent.cancel).toEqual('function');
			});

			it('should call the raiseConfirm method of MessagingService when called and the form is dirty', () => {
				editCreditCardComponent.creditCardForm.markAsDirty();
				editCreditCardComponent.cancel()
					.then(() => {
						expect(messagingService.raiseConfirm).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when called and the form is not dirty', () => {
				editCreditCardComponent.cancel()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});
		});
	});
});