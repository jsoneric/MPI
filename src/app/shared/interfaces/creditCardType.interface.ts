/*
  "cc_type_id": 1,
  "name": "Visa",
  "accepted": 1,
  "image_name": "visa"
 */
export class CreditCardType {
	cc_type_id: number;
	name: string;
	accepted: number;
	image_name: string;
	cvvMessage?:string;
}
