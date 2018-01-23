import { Vehicle } from './vehicle.interface';
import {PermitPrivilege} from "./permitPrivilege.interface";
import {PermitType} from "./permitType.interface";
import {PermitAttribute} from "./permitAttribute.interface";

export interface Permit {
    mpermit_id: number;
    owner_id: number;
    permit_number: string;
    status: string;
    mpermit_type_id: number;
    valid_start_date: string;
    valid_end_date: string;
    create_date: string;
    update_date: string;
    space: number;
    privileges: PermitPrivilege[];
    type: PermitType;
    vehicles: Vehicle[];
    extra: PermitAttribute[];
    name: string;
    description: string;
}