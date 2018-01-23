/*
	"cc_storage_id": 15,
	"owner_id": 45,
	"alias": "BlingBling",
	"billing_first_name": "Papa",
	"billing_last_name": "Warbucks",
	"billing_address": "1 Money Street",
	"billing_city": "New York",
	"billing_state_id": "NY",
	"billing_zip": "10009",
	"cc_number": "411111******1111",
	"cc_type_id": 1,
	"cc_type": {
	  "cc_type_id": 1,
	  "name": "Visa",
	  "accepted": 1,
	  "image_name": "visa"
	},
	"cc_exp_month": 10,
	"cc_exp_year": 2017
 */
import {CreditCardType} from "./creditCardType.interface";

export class CreditCard {
	cc_storage_id: number;
	owner_id: number;
	alias: string;
	billing_first_name: string;
	billing_last_name: string;
	billing_address: string;
	billing_city: string;
	billing_state_id: string;
	billing_zip: string;
	cc_type_id: number;
	cc_type: CreditCardType;
	card_mask: string;
	cc_number?:string;
	cc_exp_month: number;
	cc_exp_year: number;
	cvv?:number;
	payment_method_token?:string;
	payment_method_fingerprint?:string;
}