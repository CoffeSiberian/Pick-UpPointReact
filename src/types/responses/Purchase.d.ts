import { AxiosResponse } from "axios";
import { Products } from "../model";

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

export interface MostPurchasedItemsObject {
	fk_product: string;
	total: number;
	product: Products;
}

export interface PurchasesTotalResponseObject {
	purchases: PurchaseTotalObject[];
	total_purchases_money: number;
}

export interface PurchaseTotalNumbersResponseObject {
	total_money: number;
	total_sales: number;
}

export interface PurchaseResponse extends AxiosResponse {
	data: PurchaseResponseObject;
}

export interface PurchasesTotalResponse extends AxiosResponse {
	data: PurchasesTotalResponseObject;
}

export interface MostPurchasedItemsResponse extends AxiosResponse {
	data: { most_purchased_items: MostPurchasedItemsObject[] };
}
