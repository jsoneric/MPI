import {Injectable} from "@angular/core";

import {HttpService} from "./http.service";
import {LoggingService} from "./logging.service";
import {Vehicle} from "../interfaces/vehicle.interface";
import {HttpRequestObject} from "../classes/httpRequest.class";
import {UserClass} from "../classes/user.class";

@Injectable()
export class VehicleService{
	private body = new HttpRequestObject();
	private baseUrl:string = '/vehicles';
	constructor(private httpService: HttpService, private loggingService: LoggingService, private userClass: UserClass){}

	//TODO: The server is not able to accept requests for an individual vehicle at this time. Once it can, this entire method needs to be re-written.
	loadVehicle(vehicle_id:number): Promise<any>{
		this.body.url = `${this.baseUrl}/${vehicle_id}`;
		return this.httpService.load(this.body)
			.then((resp) => {
				if(resp.success){
					return resp.vehicle;
				} else {
					return null;
				}
			})
			.catch((err) => {
				return err;
			});
	}

	vehicleList():Promise<Vehicle[]>{
		this.body.url = this.baseUrl;
		return this.httpService.load(this.body)
			.then((resp) => {
				//TODO: API always returns success = false for this endpoint. Must fix to return real value for success.
				return this.buildVehicleArray(resp.vehicles);
				/*
				if(resp.success){
					return this.buildVehicleArray(resp.vehicles);
				} else {
					return resp;
				}
				*/
			})
			.catch((err) => {
				return err;
			});
	}

	//TODO: The server does not support PUT verb at this time. Once it does, this method needs to be updated to do it the right way.
	saveVehicle(theVehicle:Vehicle):Promise<any>{
		this.body.data = theVehicle;
		this.body.url = `${this.baseUrl}/${theVehicle.vehicle_id}`;
		return this.httpService.create(this.body)
			.then((resp) => {
				this.userClass.addVehicle(<Vehicle>resp.vehicle);
				return resp;
			})
			.catch((err) => {
				return err;
			});
	}

	//TODO: The server does not support the DELETE verb at this time. Once it does, this method needs to be updated to do it the right way.
	removeVehicle(theVehicle:Vehicle):Promise<any>{
		this.body.url = `${this.baseUrl}/${theVehicle.vehicle_id}/delete`;
		this.body.data = theVehicle;
		return this.httpService.load(this.body)
			.then((resp) => {
				return resp;
			})
			.catch((err) => {
				return err;
			});
	}

	newVehicle():Vehicle{
		let newV = <Vehicle>{};
		newV.vehicle_id = 0;
		newV.alias = '';
		newV.license = '';
		newV.vin = '';
		newV.state_id = '';
		newV.type = '';
		return newV;
	}

	private buildVehicleArray(rawData:object): Vehicle[]{
		let retVal: Vehicle[] = [];

		for (let thisVehicle in rawData) {
			retVal.push(<Vehicle>rawData[thisVehicle]);
		}

		return retVal;
	}

	private notInitialized(theVehicle:Vehicle): boolean {
		return theVehicle.vehicle_id === 0;
	}
}