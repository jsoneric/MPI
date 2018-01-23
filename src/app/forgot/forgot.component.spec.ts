import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {IonicModule, NavController} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import {FormBuilderMock} from "../../../test-config/custom-mocks/formBuilder.mock";
import {NavControllerMock} from "../../../test-config/custom-mocks/navController.mock";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {ForgotComponent} from "./forgot.component";
import {UserClass} from "../shared/classes/user.class";
import {UserClassMock} from "../../../test-config/custom-mocks/user.class.mock";
import {LoggingService} from "../shared/services/logging.service";
import {LoggingServiceMock} from "../../../test-config/custom-mocks/logging.service.mock";
import {HttpService} from "../shared/services/http.service";
import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

describe('Forgot Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[ForgotComponent],
				imports: [IonicModule.forRoot(ForgotComponent), HttpClientModule, TranslateModule.forRoot()],
				providers :[
					UserClass,
					{provide: LoggingService, useClass: LoggingServiceMock},
					NavController,
					HttpService,
					{provide: MessagingService, useClass: MessagingServiceMock},
					TranslateService
					]
			});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(ForgotComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof ForgotComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navCtrl: NavController;
		let formBuilder: FormBuilder;
		let userClass: UserClass;
		let loggingService: LoggingService;
		let messagingService: MessagingService;
		let translationService: TranslateService;

		let forgotComponent: ForgotComponent;

		beforeEach(() => {
			navCtrl = NavControllerMock.instance();
			formBuilder = FormBuilderMock.instance();
			userClass = UserClassMock.instance();
			loggingService = LoggingServiceMock.instance();
			messagingService = MessagingServiceMock.instance();
			translationService = TranslateServiceMock.instance();

			forgotComponent = new ForgotComponent(navCtrl, formBuilder, messagingService, userClass, loggingService, translationService);
		});

		describe('resetPassword method', () => {
			it('should be defined', () => {
				expect(forgotComponent.resetPassword).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof forgotComponent.resetPassword).toEqual('function');
			});

			it('should call the resetPassword method of UserClass when called', () => {
				forgotComponent.resetPassword()
					.then(() => {
						expect(userClass.resetPassword).toHaveBeenCalled();
					});
			});

			it('should try to present the success message when a call succeeds', () => {
				userClass.resetPassword = jasmine.createSpy('resetPassword', () => {}).and.returnValue(Promise.resolve({success:true, msg:''}));
				forgotComponent.resetPassword()
					.then(() => {
						expect(messagingService.raiseToast).toHaveBeenCalled();
					});
			});

			it('should try to present the failure message when a call fails', () => {
				userClass.resetPassword = jasmine.createSpy('resetPassword', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
				forgotComponent.resetPassword()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});
		});

		describe('backToLogin method', () => {
			it('should be defined', () => {
				expect(forgotComponent.backToLogin).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof forgotComponent.backToLogin).toEqual('function');
			});

			it('should call the pop method of navCtrl when called', () => {
				forgotComponent.backToLogin();
				expect(navCtrl.pop).toHaveBeenCalled();
			});
		});
	});
});