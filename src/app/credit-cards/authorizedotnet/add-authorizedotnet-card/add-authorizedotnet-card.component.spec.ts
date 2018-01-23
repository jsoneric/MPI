import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IonicModule, NavController} from "ionic-angular";
import {NavControllerMock} from "../../../../../test-config/custom-mocks/navController.mock";
import {FormBuilder} from "@angular/forms";
import {FormBuilderMock} from "../../../../../test-config/custom-mocks/formBuilder.mock";
import {CardIO} from "@ionic-native/card-io";
import {CardIoMock} from "../../../../../test-config/custom-mocks/card-io.mock";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MessagingService} from "../../../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../../../test-config/custom-mocks/messaging.service.mock";
import {AlertButtonConfigClass} from "../../../shared/classes/alertConfig.class";
import {CreditCardService} from "../../../shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../../../../test-config/custom-mocks/creditCard.service.mock";
import {CreditCard} from "../../../shared/interfaces/creditCard.interface";
import {CreditCardType} from "../../../shared/interfaces/creditCardType.interface";
import {TranslateServiceMock} from "../../../../../test-config/custom-mocks/ngx-translateService.mock";

import {AddAuthorizedotnetCardComponent} from "./add-authorizedotnet-card.component";

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

xdescribe('Add Authorizedotnet Card Component', () => {
	xdescribe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[AddAuthorizedotnetCardComponent],
				imports: [IonicModule.forRoot(AddAuthorizedotnetCardComponent), TranslateModule.forRoot()],
				providers :[
					{provide:NavController, useClass:NavControllerMock},
					FormBuilder,
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:CreditCardService, useClass:CreditCardServiceMock},
					{provide:CardIO, useClass:CardIoMock},
					TranslateService
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(AddAuthorizedotnetCardComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof AddAuthorizedotnetCardComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navController:NavController;
		let formBuilder: FormBuilder;
		let messagingService:MessagingService;
		let creditCardService: CreditCardService;
		let cardio: CardIO;
		let translationService:TranslateService;

		let addCreditCardComponent:AddAuthorizedotnetCardComponent;

		beforeEach(() => {
			navController = NavControllerMock.instance();
			messagingService = MessagingServiceMock.instance();
			creditCardService = CreditCardServiceMock.instance();
			formBuilder = new FormBuilder();
			cardio = CardIoMock.instance();
			translationService = TranslateServiceMock.instance();

			addCreditCardComponent = new AddAuthorizedotnetCardComponent(navController, formBuilder, creditCardService, messagingService, cardio, translationService);
		});

		xdescribe('save method', () => {
			it('should be defined', () => {
				expect(addCreditCardComponent.save).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof addCreditCardComponent.save).toEqual('function');
			});

			it('should call the saveCard method of CreditCardService when called and the form is dirty', () => {
				addCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				addCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				addCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				addCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				addCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				addCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				addCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:true}));
				addCreditCardComponent.save()
					.then(() => {
						expect(creditCardService.saveCard).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when called and the form is not dirty', () => {
				addCreditCardComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});

			it('should call the pop method of NavController when the server responds with success', () => {
				addCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				addCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				addCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				addCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				addCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				addCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				addCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:true}));
				addCreditCardComponent.save()
					.then(() => {
						expect(navController.pop).toHaveBeenCalled();
					});
			});

			it('should call the raiseAlert method of MessagingService when the server responds with failure', () => {
				addCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				addCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				addCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				addCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				addCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				addCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				addCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
				addCreditCardComponent.save()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});

			it('should handle server errors when they are returned', () => {
				addCreditCardComponent.creditCardForm.get('alias').setValue('abc');
				addCreditCardComponent.creditCardForm.get('billing_zip').setValue('12345');
				addCreditCardComponent.creditCardForm.get('cc_type').setValue('abc123');
				addCreditCardComponent.creditCardForm.get('card_mask').setValue('5454545454545454');
				addCreditCardComponent.creditCardForm.get('cc_exp_date').setValue('1');
				addCreditCardComponent.creditCardForm.get('cvv').setValue('123');
				addCreditCardComponent.creditCardForm.markAsDirty();
				creditCardService.saveCard = jasmine.createSpy('saveCard', () => {}).and.returnValue(Promise.reject({msg:''}));
				addCreditCardComponent.save()
					.catch(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
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
	});
});