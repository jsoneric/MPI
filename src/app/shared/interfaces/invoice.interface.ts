/*
 "create_date": "2017-04-14T09:10:46",
 "payment_method": "Credit Card",
 "permit_name": "Summer 2017",
 "status": "Approved",
 "cc_exp_month": "1",
 "amount": "1.0",
 "cc_type": "1",
 "cc_exp_year": "2022",
 "invoice_id": "454",
 "type": "1",
 "cc_type_name": "",
 "description": "Purchase Permit",
 "cc_number": "4111********1111",
 "period_type": "absolute",
 "permit_space": "0"
 */

export class Invoice {
	create_date: string;
	payment_method: string;
	permit_name: string;
	status: string;
	cc_exp_month: number;
	amount: number;
	cc_type: number;
	cc_exp_year: number;
	invoice_id: number;
	type: number;
	cc_type_name:string;
	description: string;
	cc_number: string;
	period_type: string;
	permit_space: number;
}