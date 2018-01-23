import { PermitTime } from "./permitTime.interface";

export interface PermitType {
    mpermit_type_id: number;
    name: string;
    description: string;
    max_vehicles: number;
    max_concurrent: number;
    max_issued: number;
    period_type: string;
    period_start_date: string;
    period_end_date: string;
    renewable: boolean;
    period_days: number;
    space_start: number;
    space_end: number;
    max_minutes: number;
    cost: number;
    requires_shipping: boolean;
    can_pickup: boolean;
    can_print: boolean;
    times: PermitTime[];
}




