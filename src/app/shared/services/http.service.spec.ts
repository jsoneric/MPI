import {inject, TestBed} from '@angular/core/testing';
import {FormsModule, FormBuilder} from "@angular/forms";

import {HttpService} from "./http.service";
import {HttpRequestObject} from "../classes/httpRequest.class";

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HTTP Service', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:[HttpClientTestingModule, FormsModule],
			providers:[HttpService, FormBuilder]
		});
	});

	afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
		httpMock.verify();
	}));

	describe('Create method', () => {
		it('should make a POST request', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.create(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.method).toEqual('POST');
			fake.flush({});
		}));

		it('should make the request to the provided URL', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.create(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.url).toEqual('/blah');
			fake.flush({});
		}));

		it('should return the correct status code when an error is thrown', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/bad';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.create(fakeRequest)
				.then((data) => {})
				.catch((err) => {
					expect(err.status).toEqual(400);
				});
			const fake = httpMock.expectOne('/bad');
			fake.flush({status:400});
		}));
	});

	describe('Update method', () => {
		it('should make a PUT request', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.update(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.method).toEqual('PUT');
			fake.flush({});
		}));

		it('should make the request to the provided URL', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.update(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.url).toEqual('/blah');
			fake.flush({});
		}));

		it('should return the correct status code when an error is thrown', inject([HttpService, HttpTestingController, FormBuilder], (httpService:HttpService, httpMock: HttpTestingController, formBuilder: FormBuilder) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/bad';
			fakeRequest.overrideBaseUrl = true;
			fakeRequest.data = formBuilder.group({});
			httpService.update(fakeRequest)
				.then((data) => {})
				.catch((err) => {
					expect(err.status).toEqual(400);
				});
			const fake = httpMock.expectOne('/bad');
			fake.flush({status:400});
		}));
	});

	describe('Load method', () => {
		it('should make a GET request', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			httpService.load(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.method).toEqual('GET');
			fake.flush({});
		}));

		it('should make the request to the provided URL', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			httpService.load(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.url).toEqual('/blah');
			fake.flush({});
		}));

		it('should return the correct status code when an error is thrown', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/bad';
			fakeRequest.overrideBaseUrl = true;
			httpService.load(fakeRequest)
				.then((data) => {})
				.catch((err) => {
					expect(err.status).toEqual(400);
				});
			const fake = httpMock.expectOne('/bad');
			fake.flush({status:400});
		}));
	});

	describe('Remove method', () => {
		it('should make a DELETE request', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			httpService.remove(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.method).toEqual('DELETE');
			fake.flush({});
		}));

		it('should make the request to the provided URL', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/blah';
			fakeRequest.overrideBaseUrl = true;
			httpService.remove(fakeRequest);
			const fake = httpMock.expectOne('/blah');
			expect(fake.request.url).toEqual('/blah');
			fake.flush({});
		}));

		it('should return the correct status code when an error is thrown', inject([HttpService, HttpTestingController], (httpService:HttpService, httpMock: HttpTestingController) => {
			let fakeRequest = new HttpRequestObject();
			fakeRequest.url = '/bad';
			fakeRequest.overrideBaseUrl = true;
			httpService.remove(fakeRequest)
				.then((data) => {})
				.catch((err) => {
					expect(err.status).toEqual(400);
				});
			const fake = httpMock.expectOne('/bad');
			fake.flush({status:400});
		}));
	});

	describe('token property', () => {
		it('should be defined', inject([HttpService], (httpService:HttpService) => {
			expect(httpService.token).toBeDefined();
		}));

		it('should be a string', inject([HttpService], (httpService:HttpService) => {
			expect(typeof httpService.token).toEqual('string');
		}));

		it('should return an empty string by default', inject([HttpService], (httpService:HttpService) => {
			expect(httpService.token).toEqual('');
		}));

		it('should hold the passed value', inject([HttpService], (httpService:HttpService) => {
			httpService.token = 'ABC';
			expect(httpService.token).toEqual('ABC');
		}));
	});
});