import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {HttpService} from "../services/http.service";
import {HttpRequestObject} from "./httpRequest.class";
import {LoggingService} from "../services/logging.service";
import {Vehicle} from "../interfaces/vehicle.interface";

@Injectable()
export class UserClass {
	private loggedIn: boolean = false;

	private attemptMessage: string = '';
	public owner: any = {owner_id:0, pbn_token:''};
	private vehicles: Vehicle[] = [];
	private body = new HttpRequestObject();

	constructor(private httpService: HttpService, private loggingService: LoggingService){}

	get isLoggedIn(): boolean {
		return this.loggedIn;
	}

	get message(): string {
		return this.attemptMessage;
	}

	get vehicleList(): Vehicle[] {
		return this.vehicles;
	}

	get token() : string {
		return this.owner.pbn_token;
	}

	addVehicle(theVehicle: Vehicle){
		let checkArray: Vehicle[] = [];
		checkArray = this.vehicles.filter((checkMe) => {
			return checkMe.vehicle_id == theVehicle.vehicle_id;
		});
		if(!checkArray.length){
			this.vehicles.push(theVehicle);
		}
	}

	save(): Promise<any> {
		this.body.data = this.owner;
		if(this.notInitialized()){
			return this.httpService.create(this.body)
				.then((resp) => {
					if(resp.success){
						this.loadCustomerCallback(resp);
					}
					return resp;
				})
				.catch((err) => {
					this.loadCustomerError(err);
					return err;
				});
		} else {
			return this.httpService.update(this.body)
				.then((resp) => {
					this.loadCustomerCallback(resp);
					return resp;
				})
				.catch((err) => {
					this.loadCustomerError(err);
					return err;
				});
		}
	}

	load(passedId): Promise<any> {
		if(!passedId){
			throw new Error('Calling .load on the UserClass requires that a userIdValue be provided!');
		}
		this.owner.owner_id = passedId;
		this.body.queryString = '?id=' + passedId;
		return this.httpService.load(this.body)
			.then((resp) => {
				this.loadCustomerCallback(resp);
				return resp;
			})
			.catch((err) => {
				this.loadCustomerError(err);
				return err;
			});
	}

	reload(): Promise<any> {
		if(!this.owner.owner_id){
			throw new Error('UserClass is not initialized!');
		}
		this.body.url = '/account';
		return this.httpService.load(this.body)
			.then((resp) => {
				this.loadCustomerCallback(resp);
				return resp;
			})
			.catch((err) => {
				this.loadCustomerError(err);
				return err;
			});
	}

	remove(): Promise<any> {
		if(this.notInitialized()){
			throw new Error('User class has not been initialized to a user instance!');
		}
		this.body.queryString = '?id=' + this.owner.owner_id;
		return this.httpService.remove(this.body)
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				return err;
			});
	}

	login(params: FormGroup): Promise<any> {
		this.body.data = params;
		this.body.url = '/doLogin';
		return this.httpService.create(this.body)
			.then((resp) => {
				this.loadCustomerCallback(resp);
				this.loggingService.info('Login successful');
				return resp;
			})
			.catch((err) => {
				this.loadCustomerError(err);
				this.loggingService.info('Login not successful: ' + err.msg);
				return err;
			});
	}

	signUp(params: FormGroup): Promise<any> {
		this.body.data = params;
		this.body.url = '/register';
		return this.httpService.create(this.body)
			.then((resp) => {
				if(resp.success){
					this.loadCustomerCallback(resp);
					this.loggingService.info('Account creation success');
				} else {
					this.loadCustomerError(resp);
					this.loggingService.info('Account creation failed: ' + resp.msg);
				}
				return resp;
			})
			.catch((err) => {
				this.loadCustomerError(err);
				this.loggingService.info('Account creation call failed: ' + err.msg);
				return err;
			});
	}

	resetPassword(params: FormGroup): Promise<any> {
		this.body.data = params;
		this.body.url = '/password';
		return this.httpService.create(this.body)
			.then((resp) => {
				this.loggedIn = false;
				this.loggingService.info('ResetPassword call succeeded');
				return resp;
			})
			.catch((err) => {
				this.loggedIn = false;
				this.attemptMessage = err.msg;
				this.loggingService.info('ResetPassword call failed: ' + err.msg);
				return err;
			});
	}

	private notInitialized(): boolean {
		return this.owner.owner_id === 0;
	}

	private buildVehicleArray(rawData:object): Vehicle[]{
		let retVal: Vehicle[] = [];

		for (let thisVehicle in rawData) {
			retVal.push(<Vehicle>rawData[thisVehicle]);
		}

		return retVal;
	}

	private loadCustomerCallback(resp){
		if(resp.success){
			this.loggedIn = true;
			this.attemptMessage = '';
			this.owner = resp.owner;
			this.vehicles = this.buildVehicleArray(resp.vehicles);
			this.httpService.token = resp.owner.pbn_token;
		} else {
			this.loggedIn = false;
			this.attemptMessage = resp.msg;
			this.owner = {owner_id:0};
			this.vehicles = [];
			this.httpService.token = '';
		}
	}

	private loadCustomerError(err){
		this.loggedIn = false;
		this.attemptMessage = err.msg;
		this.owner = {};
		this.vehicles = [];
		this.loggingService.info('Login call failed: ' + err.msg);
	}
}