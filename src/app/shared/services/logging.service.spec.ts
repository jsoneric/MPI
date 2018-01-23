import {Platform} from "ionic-angular";
import {PlatformMock} from "ionic-mocks";
import {AppVersion} from "@ionic-native/app-version";
import {AppVersionMock} from "../../../../test-config/custom-mocks/appVersion.mock";
import {FormBuilder} from "@angular/forms";

import {LoggingService} from "./logging.service"

import {ConfigurationService} from "./configuration.service";
import {ConfigurationServiceMock} from "../../../../test-config/custom-mocks/configuration.service.mock";
import {HttpService} from "./http.service";
import {HttpServiceMock} from "../../../../test-config/custom-mocks/http.service.mock"
import {FormBuilderMock} from "../../../../test-config/custom-mocks/formBuilder.mock";

describe('Logging Service', () => {
	let loggingService: LoggingService;
	let httpService: HttpService;
	let configurationService: ConfigurationService;
	let platform: Platform;
	let appVersion: AppVersion;
	let formBuilder: FormBuilder;

	beforeEach(() => {
		httpService = HttpServiceMock.instance();
		configurationService = ConfigurationServiceMock.instance();
		platform = PlatformMock.instance();
		appVersion = AppVersionMock.instance();
		formBuilder = FormBuilderMock.instance();

		loggingService = new LoggingService(httpService, configurationService, platform, appVersion, formBuilder);
	});

	describe('Info method', () => {
		it('should be defined', () => {
			expect(loggingService.info).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof loggingService.info).toEqual('function');
		});

		it('should check the log level for the application when called', () => {
			loggingService.info('Blah');
			expect(configurationService.getLogLevel).toHaveBeenCalled();
		});
	});

	describe('Debug method', () => {
		it('should be defined', () => {
			expect(loggingService.debug).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof loggingService.debug).toEqual('function');
		});

		it('should call the Info method when called', () => {
			spyOn(loggingService, 'info').and.callThrough();
			spyOn(window.console, 'log').and.callFake(() => {return true;});
			loggingService.debug('Blah', ['Blah'], true);
			expect(loggingService.info).toHaveBeenCalled();
		});

		it('should try to post the log contents when called without the skipTransmit parameter', () => {
			spyOn(window.console, 'log').and.callFake(() => {return true;});
			loggingService.debug('Blah', ['Blah']);
			expect(httpService.create).toHaveBeenCalled();
		});
	});

	describe('Verbose method', () => {
		it('should be defined', () => {
			expect(loggingService.verbose).toBeDefined();
		});

		it('should be a function', () => {
			expect(typeof loggingService.verbose).toEqual('function');
		});

		it('should call the Debug method when called', () => {
			spyOn(loggingService, 'debug').and.callThrough();
			spyOn(window.console, 'log').and.callFake(() => {return true;});
			loggingService.verbose('Blah', ['Blah'], true);
			expect(loggingService.debug).toHaveBeenCalled();
		});

		it('should try to post the log contents when called without the skipTransmit parameter', () => {
			spyOn(window.console, 'log').and.callFake(() => {return true;});
			loggingService.verbose('Blah', ['Blah']);
			expect(httpService.create).toHaveBeenCalled();
		});
	});
});