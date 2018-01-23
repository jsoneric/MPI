import {CUSTOM_ELEMENTS_SCHEMA, Renderer} from "@angular/core";
import {RendererMock} from "../../../test-config/custom-mocks/renderer.mock";
import {async, TestBed} from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";
import {IonicModule, NavController} from "ionic-angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavControllerMock} from "../../../test-config/custom-mocks/navController.mock";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {UserClass} from "../shared/classes/user.class";
import {UserClassMock} from "../../../test-config/custom-mocks/user.class.mock";
import {LoggingService} from "../shared/services/logging.service";
import {LoggingServiceMock} from "../../../test-config/custom-mocks/logging.service.mock";
import {HttpService} from "../shared/services/http.service";
import {HttpServiceMock} from "../../../test-config/custom-mocks/http.service.mock";
import {MessagingService} from "../shared/services/messaging.service";
import {MessagingServiceMock} from "../../../test-config/custom-mocks/messaging.service.mock";
import {ListService} from "../shared/services/list.service";
import {ListServiceMock} from "../../../test-config/custom-mocks/list.service.mock";
import {TranslateServiceMock} from "../../../test-config/custom-mocks/ngx-translateService.mock";

import {SignUpComponent} from './sign-up.component';

describe('SignUp Component', () => {
	describe('after initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[SignUpComponent],
				imports: [IonicModule.forRoot(SignUpComponent), HttpClientModule, TranslateModule.forRoot()],
				providers :[{provide:UserClass, useClass:UserClassMock},
					{provide: LoggingService, useClass: LoggingServiceMock},
					{provide:NavController, useClass:NavControllerMock},
					FormBuilder,
					{provide:MessagingService, useClass:MessagingServiceMock},
					{provide:HttpService, useClass:HttpServiceMock},
					{provide: ListService, useClass: ListServiceMock},
					{provide:TranslateService, useClass:TranslateServiceMock},
					{provide: Renderer, useClass: RendererMock}
					],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(SignUpComponent);
			component = fixture.componentInstance;
		});

		it('should be defined', () => {
			expect(component).toBeDefined();
		});

		it('should be created', () => {
			expect(component instanceof SignUpComponent).toBe(true);
		});
	});

	describe('methods', () => {
		let navCtrl: NavController;
		let formBuilder: FormBuilder;
		let userClass: UserClass;
		let loggingService: LoggingService;
		let messagingService: MessagingService;
		let listService: ListService;
		let tempForm: FormGroup;
		let translateService: TranslateService;
		let renderer: Renderer;

		let signUpComponent: SignUpComponent;

		beforeEach(() => {
			navCtrl = NavControllerMock.instance();
			userClass = UserClassMock.instance();
			formBuilder = new FormBuilder();
			loggingService = LoggingServiceMock.instance();
			messagingService = MessagingServiceMock.instance();
			listService = ListServiceMock.instance();
			translateService = TranslateServiceMock.instance();
			renderer = RendererMock.instance();
			tempForm = formBuilder.group({
				first_name: [''],
				last_name: [''],
				email: [''],
				username: [''],
				password: [''],
				confirm_password: ['']
			});

			signUpComponent = new SignUpComponent(navCtrl, formBuilder, messagingService, userClass, loggingService, listService, translateService, renderer);
		});

		describe('signUpAccount method', () => {
			it('should be defined', () => {
				expect(signUpComponent.signUpAccount).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof signUpComponent.signUpAccount).toEqual('function');
			});

			it('should try to call the signup method of UserClass', () => {
				tempForm.setValue({first_name:'blah',last_name:'blah',email:'blah',username:'blah',password:'test',confirm_password:'test'});
				userClass.signUp = jasmine.createSpy('signUp', () => {}).and.returnValue(Promise.resolve({success:true}));
				signUpComponent.signup = tempForm;
				signUpComponent.signUpAccount();
				expect(userClass.signUp).toHaveBeenCalled();
			});

			it('should try to call the raiseAlert method of MessagingService when the passwords do not match', () => {
				tempForm.setValue({first_name:'blah',last_name:'blah',email:'blah',username:'blah',password:'test',confirm_password:'fail'});
				userClass.signUp = jasmine.createSpy('signUp', () => {}).and.returnValue(Promise.resolve({success:true}));
				signUpComponent.signup = tempForm;
				signUpComponent.signUpAccount();
				expect(messagingService.raiseAlert).toHaveBeenCalled();
			});

			it('should try to call the raiseAlert method of MessagingService if the attempt fails', () => {
				tempForm.setValue({first_name:'blah',last_name:'blah',email:'blah',username:'blah',password:'test',confirm_password:'test'});
				userClass.signUp = jasmine.createSpy('signUp', () => {}).and.returnValue(Promise.resolve({success:false, msg:''}));
				messagingService.raiseAlert = jasmine.createSpy('raiseAlert', () => {}).and.callThrough();
				signUpComponent.signup = tempForm;
				signUpComponent.signUpAccount()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});

			it('should handle server errors if they happen', () => {
				tempForm.setValue({first_name:'blah',last_name:'blah',email:'blah',username:'blah',password:'test',confirm_password:'test'});
				userClass.signUp = jasmine.createSpy('signUp', () => {}).and.returnValue(Promise.reject({success:false, msg:''}));
				messagingService.raiseAlert = jasmine.createSpy('raiseAlert', () => {}).and.callThrough();
				signUpComponent.signup = tempForm;
				signUpComponent.signUpAccount()
					.then(() => {
						expect(messagingService.raiseAlert).toHaveBeenCalled();
					});
			});
		});
	});
});