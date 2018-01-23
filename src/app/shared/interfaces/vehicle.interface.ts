/*
 "vehicle_id": 66,
 "owner_id": 12,
 "license": "test123",
 "vin": "",
 "make_id": "ACUR",
 "color_id": "AME",
 "state_id": "AK",
 "create_date": "Apr 14, 2017 9:09:39 AM",
 "update_date": "Apr 14, 2017 9:09:39 AM",
 "alias": "GoGoGo",
 "type": "Car",
 "extra": []
 */
import {VehicleAttribute} from "./vehicleAttribute.interface";

export interface Vehicle{
	vehicle_id: number;
	owner_id: number;
	license: string;
	vin: string;
	make_id: string;
	color_id: string;
	state_id: string;
	create_date: string;
	update_date: string;
	type:string;
	alias:string;
	extra: VehicleAttribute[];
}