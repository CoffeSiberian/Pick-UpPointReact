import { AxiosResponse } from "axios";

export interface PurchaseResponseObject {
	id: string;
	url_pay: string;
	pay_flow_id: number;
}

export interface PurchaseResponse extends AxiosResponse {
	data: PurchaseResponseObject;
}
