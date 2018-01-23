import {Injectable} from '@angular/core';

import {HttpService} from "./http.service";
import {LoggingService} from "./logging.service";
import {HttpRequestObject} from "../classes/httpRequest.class";
import {State} from "../interfaces/state.interface";
import {Lot} from "../interfaces/lot.interface";
import {VehicleType} from "../interfaces/vehicleType.interface";

@Injectable()
export class ListService{
	private statesArray: State[] = [];
	private lotsArray: Lot[] = [];
	private vehicleTypesArray: VehicleType[] = [];

	constructor(private httpService: HttpService, private loggingService:LoggingService){}

	loadLists():Promise<any> {
		let req = new HttpRequestObject();
		req.url = '/lists';
		return this.httpService.load(req)
			.then((resp) => {
				if(resp.success){
					this.statesArray = resp.states.map((thisState) => {
						return <State>thisState;
					});
					this.lotsArray = resp.lots.map((thisLot) => {
						return <Lot>thisLot;
					});
					this.vehicleTypesArray = resp.vehicle_classes.map((thisVehicleType) => {
						return <VehicleType>thisVehicleType;
					});
				} else {
					this.loggingService.info(resp.msg);
				}
			})
			.catch((err) => {
				this.loggingService.info(err);
			});
	}

	get states(): State[]{
		return this.statesArray;
	}

	get lots(): Lot[]{
		return this.lotsArray;
	}

	get vehicleTypes(): VehicleType[]{
		return this.vehicleTypesArray;
	}
}