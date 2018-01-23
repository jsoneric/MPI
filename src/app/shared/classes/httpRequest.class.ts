import {HttpHeaders} from "@angular/common/http";

export class HttpRequestObject {
	url: string = '';
	queryString?: string = '';
	data?: any;
	headers?: HttpHeaders;
	overrideBaseUrl?: boolean = false;
}