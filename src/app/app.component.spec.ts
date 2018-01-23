import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IonicModule, Events} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import {IsDebug} from "@ionic-native/is-debug";
import {IsDebugMock} from '@ionic-native-mocks/is-debug';
import {HttpClientModule} from "@angular/common/http";
import {AppVersion} from "@ionic-native/app-version";
import {AppVersionMock} from "@ionic-native-mocks/app-version";
import {SplashScreen} from "@ionic-native/splash-screen";
import {SplashScreenMock} from "@ionic-native-mocks/splash-screen"
import {StatusBar} from "@ionic-native/status-bar";
import {StatusBarMock} from "@ionic-native-mocks/status-bar";
import {Platform} from "ionic-angular";
import {PlatformMock} from "../../test-config/mocks-ionic";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SQLite} from "@ionic-native/sqlite";
import {SQLiteMock} from "@ionic-native-mocks/sqlite";
import {FormBuilder} from "@angular/forms";
import {FormBuilderMock} from "../../test-config/custom-mocks/formBuilder.mock";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

import {PayByMobileComponent} from './app.component';

import {LoggingService} from "./shared/services/logging.service";
import {HttpService} from "./shared/services/http.service";
import {UserClass} from "./shared/classes/user.class";
import {UserClassMock} from "../../test-config/custom-mocks/user.class.mock";
import {ListService} from "./shared/services/list.service";
import {ListServiceMock} from "../../test-config/custom-mocks/list.service.mock";
import {ConfigurationService} from "./shared/services/configuration.service";
import {LoginComponent} from "./login/login.component";
import {LoggingServiceMock} from "../../test-config/custom-mocks/logging.service.mock";
import {HttpServiceMock} from "../../test-config/custom-mocks/http.service.mock";
import {ConfigurationServiceMock} from "../../test-config/custom-mocks/configuration.service.mock";
import {TranslateServiceMock} from "../../test-config/custom-mocks/ngx-translateService.mock";
import {MessagingService} from "./shared/services/messaging.service";
import {MessagingServiceMock} from "../../test-config/custom-mocks/messaging.service.mock";
import {CreditCardService} from "./shared/services/creditCard.service";
import {CreditCardServiceMock} from "../../test-config/custom-mocks/creditCard.service.mock";
import {LocalStorageService} from "./shared/services/localStorage.service";
import {LocalStorageServiceMock} from "../../test-config/custom-mocks/localStorage.service.mock";

xdescribe('App Component', () => {
	describe('initialization', () => {
		let fixture, component;

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				declarations:[PayByMobileComponent, LoginComponent],
				imports: [IonicModule.forRoot(PayByMobileComponent), IonicStorageModule.forRoot({name : 'PayByMobile'}), HttpClientModule, TranslateModule.forRoot()],
				providers :[
					{provide: StatusBar, useClass: StatusBarMock},
					{provide: SplashScreen, useClass: SplashScreenMock},
					{provide: Platform, useClass: PlatformMock},
					{provide: IsDebug, useClass: IsDebugMock},
					LoggingService,
					HttpService,
					FormBuilder,
					TranslateService,
					{provide: AppVersion, useClass: AppVersionMock},
					{provide: UserClass, useClass: UserClassMock},
					{provide: ListService, useClass: ListServiceMock},
					ConfigurationService,
					{provide: SQLite, useClass: SQLiteMock},
					{provide: MessagingService, useClass: MessagingServiceMock},
					{provide: CreditCardService, useClass: CreditCardServiceMock},
					{provide: LocalStorageService, useClass: LocalStorageServiceMock},
					Events
				],
				schemas:[CUSTOM_ELEMENTS_SCHEMA]
			}).overrideModule(BrowserDynamicTestingModule, {set:{entryComponents:[PayByMobileComponent, LoginComponent]}});
		}));

		beforeEach(() => {
			fixture = TestBed.createComponent(PayByMobileComponent);
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
		let statusBar: StatusBar;
		let splashScreen: SplashScreen;
		let platform: Platform;
		let isDebug: IsDebug;
		let loggingService: LoggingService;
		let httpService: HttpService;
		let appVersion: AppVersion;
		let userClass: UserClass;
		let formBuilder: FormBuilder;
		let translateService: TranslateService;
		let listService: ListService;
		let configurationService: ConfigurationService;
		let sqLite: SQLite;
		let events: Events;

		let appComponent: PayByMobileComponent;

		beforeEach(() => {
			statusBar = new StatusBarMock();
			splashScreen = new SplashScreenMock();
			platform = new PlatformMock();
			isDebug = new IsDebugMock();
			loggingService = LoggingServiceMock.instance();
			httpService = HttpServiceMock.instance();
			appVersion = new AppVersionMock();
			userClass = UserClassMock.instance();
			formBuilder = FormBuilderMock.instance();
			translateService = TranslateServiceMock.instance();
			listService = ListServiceMock.instance();
			configurationService = ConfigurationServiceMock.instance();
			sqLite = new SQLiteMock();
			events = new Events();

			appComponent = new PayByMobileComponent(
				platform,
				statusBar,
				splashScreen,
				configurationService,
				loggingService,
				userClass,
				formBuilder,
				translateService,
				listService,
				sqLite,
				events)
		});

		describe('openComponent method', () => {
			it('should be defined', () => {
				expect(appComponent.openComponent).toBeDefined();
			});

			it('should be a function', () => {
				expect(typeof appComponent.openComponent).toEqual('function');
			});

			describe('when Park', () => {
				it('should call the setRoot method of the nav object when called', () => {
					spyOn(appComponent.nav, 'setRoot').and.callFake(() => {return true;});
					appComponent.openComponent(appComponent);
					expect(appComponent.nav.setRoot).toHaveBeenCalled();
				});
			});

			describe('when not Park', () => {
				it('should call the push method of the nav object when called', () => {
					spyOn(appComponent.nav, 'push').and.callFake(() => {return true;});
					appComponent.openComponent(appComponent);
					expect(appComponent.nav.push).toHaveBeenCalled();
				});
			});
		});
	});
});
