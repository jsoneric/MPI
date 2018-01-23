import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {Events, IonicModule, NavController} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormBuilderMock} from "../../../test-config/custom-mocks/formBuilder.mock";
import {NavControllerMock} from "../../../test-config/custom-mocks/navController.mock";
import {TranslateService} from "@ngx-translate/core";

import {LoginComponent} from "./login.component";
import {UserClass} from "../shared/classes/user.class";
import {UserClassMock} from "../../../test-config/custom-mocks/user.class.mock";
import {LoggingService} from "../shared/services/logging.service";
import {LoggingServiceMock} from "../../../test-config/custom-mocks/logging.service.mock";
import {HttpService} from "../shared/services/http.service";
import {TranslateModule} from "@ngx-translate/core";
import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {ListService} from "../shared/services/list.service";
import {ListServiceMock} from "../../../test-config/custom-mocks/list.service.mock";
import {CreditCardService} from "../shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../../test-config/custom-mocks/creditCard.service.mock";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

import {ForgotComponent} from '../forgot/forgot.component';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {ShowHideContainerComponent} from "../../components/show-hide-password/show-hide-container.component";

describe('Login Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[LoginComponent, ForgotComponent, SignUpComponent, ShowHideContainerComponent],
				imports: [IonicModule.forRoot(LoginComponent), IonicStorageModule.forRoot({name : 'PayByMobile'}), HttpClientModule, TranslateModule.forRoot({})],
				providers :[
					UserClass,
					{provide: LoggingService, useClass: LoggingServiceMock},
					NavController,
					HttpService,
					{provide:MessagingService, useClass: MessagingServiceMock},
					{provide: ListService, useClass: ListServiceMock},
					{provide: CreditCardService, useClass: CreditCardServiceMock},
					TranslateService,
					Events
					]
			});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(LoginComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof LoginComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navCtrl: NavController;
		let formBuilder: FormBuilder;
		let userClass: UserClass;
		let loggingService: LoggingService;
		let messagingService: MessagingService;
		let listService: ListService;
		let creditCardService: CreditCardService;
		let sampleForm: FormGroup;
		let translateService: TranslateService;
		let events: Events;

		let loginComponent: LoginComponent;

		beforeEach(() => {
			navCtrl = NavControllerMock.instance();
			formBuilder = FormBuilderMock.instance();
			messagingService = MessagingServiceMock.instance();
			userClass = UserClassMock.instance();
			loggingService = LoggingServiceMock.instance();
			listService = ListServiceMock.instance();
			creditCardService = CreditCardServiceMock.instance();
			translateService = TranslateServiceMock.instance();
			events = new Events();

			loginComponent = new LoginComponent(navCtrl, formBuilder, userClass, loggingService, messagingService, listService, creditCardService, translateService, events);
		});

		describe('forgotPassword method', () => {
			it('should be defined', () => {
				expect(loginComponent.forgotPassword).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof loginComponent.forgotPassword).toEqual('function');
			});

			it('should try to call the push method of navCtrl', () => {
				loginComponent.forgotPassword();
				expect(loginComponent.navCtrl.push).toHaveBeenCalled();
			});
		});

		describe('signUpAccount method', () => {
			it('should be defined', () => {
				expect(loginComponent.signUpAccount).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof loginComponent.signUpAccount).toEqual('function');
			});

			it('should try to call the push method of navCtrl', () => {
				loginComponent.signUpAccount();
				expect(loginComponent.navCtrl.push).toHaveBeenCalled();
			});
		});

		describe('attemptLogin method', () => {
			beforeEach(() => {
				sampleForm = formBuilder.group({
					j_username: [''],
					j_password: ['']
				})
			});

			it('should be defined', () => {
				expect(loginComponent.attemptLogin).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof loginComponent.attemptLogin).toEqual('function');
			});

			it('should call the login method of userClass when called', () => {
				loginComponent.attemptLogin();
				expect(userClass.login).toHaveBeenCalled();
			});

			it('should try to raise an alert when the login fails', () => {
				loginComponent.login = sampleForm;
				userClass.login = jasmine.createSpy('login', (() => {})).and.returnValue(Promise.resolve({success:false, msg:''}));
				loginComponent.attemptLogin()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});

			it('should load the lists when the login succeeds', () => {
				loginComponent.login = sampleForm;
				userClass.login = jasmine.createSpy('login', (() => {})).and.returnValue(Promise.resolve({success:true}));
				loginComponent.attemptLogin()
					.then(() => {
						expect(listService.loadLists).toHaveBeenCalled();
					});
			});
		});
	});
});
