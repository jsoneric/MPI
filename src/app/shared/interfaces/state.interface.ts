/*
  "type": "state",
  "codeid": "WY",
  "description": "Wyoming",
  "citation_type_id": 0,
  "is_overtime": 0,
  "is_other": 0,
  "uuid": "7be845f5-cfdc-480b-8761-6f2dbd9c1d67"
 */
export interface State {
	citation_type_id: number;
	codeid: string;
	description: string;
	is_other: number;
	is_overtime: number;
	type: string;
	uuid: string;
}