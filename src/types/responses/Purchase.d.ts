import { AxiosResponse } from "axios";

export interface PurchaseResponseObject {
	id: string;
	url_pay: string;
	pay_flow_id: number;
}

export interface PurchaseTotalObject {
	date: string;
	total_sales: number;
	total_money: number;
}

export interface PurchasesTotalResponseObject {
	purchases: PurchaseTotalObject[];
}

export interface PurchaseTotalNumbersResponseObject {
	total_money: number;
	total_sales: number;
}

export interface PurchaseResponse extends AxiosResponse {
	data: PurchaseResponseObject;
}

export interface PurchasesTotalMonthResponse extends AxiosResponse {
	data: PurchasesTotalResponseObject;
}

export interface PurchasesTotalWeekResponse extends AxiosResponse {
	data: PurchasesTotalResponseObject;
}
