import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {FormGroup} from "@angular/forms";

import {HttpRequestObject} from "../classes/httpRequest.class";

@Injectable()
export class HttpService {
	private baseUrl: string = 'https://staging-paylock.mercuryparking.com/cws/parkbynexus';
	//private baseUrl: string = 'http://192.168.0.10:8080/cws/parkbynexus';
	private tokenValue: string = '';

	constructor(private http: HttpClient) {}

	create(request: HttpRequestObject): Promise<any> {
		let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
		let headers = {headers:request.headers || this.setDefaultHeaders()};
		return this.http.post(finalUrl, this.jsonToKeyValuePair(request.data), headers).toPromise();
	}

	update(request: HttpRequestObject): Promise<any> {
		let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
		let headers = {headers:request.headers || this.setDefaultHeaders()};
		return this.http.put<any>(finalUrl, this.jsonToKeyValuePair(request.data), headers).toPromise();
	}

	load(request: HttpRequestObject): Promise<any> {
		let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
		if(request.queryString.length){
			finalUrl+= request.queryString;
		}
		let headers = {headers:request.headers || this.setDefaultHeaders()};
		return this.http.get<any>(finalUrl, headers).toPromise();
	}

	remove(request: HttpRequestObject): Promise<any> {
		let finalUrl = request.overrideBaseUrl ? request.url : this.baseUrl + request.url;
		let headers = {headers:request.headers || this.setDefaultHeaders()};
		return this.http.delete<any>(finalUrl, headers).toPromise();
	}

	get token(): string {
		return this.tokenValue;
	}

	set token(newValue:string) {
		this.tokenValue = newValue;
	}

	private jsonToKeyValuePair(jsonInput: FormGroup): string;
	private jsonToKeyValuePair(jsonInput: object): string;
	private jsonToKeyValuePair(jsonInput: any):string {
		let params = new URLSearchParams();
		if(jsonInput.controls){
			Object.keys(jsonInput.controls)
				.forEach((key) => {
					params.set(key, jsonInput.get(key).value);
				});
		} else {
			Object.keys(jsonInput)
				.forEach((key) => {
					params.set(key, jsonInput[key]);
				})
		}
		return params.toString();
	}

	private setDefaultHeaders(): HttpHeaders {
		if(!this.tokenValue.length){
			return new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		} else {
			return new HttpHeaders({
				'Content-Type':'application/x-www-form-urlencoded',
				'X-CSRF-Token': this.tokenValue
			});
		}
	}
}
