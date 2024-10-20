import { AxiosResponse } from "axios";
import { Purchases, Purchases_Items, Users } from "../model";

export interface PurchaseListResponse extends AxiosResponse {
	data: { purchases: PurchaseListResponseObject[] };
}

export interface PurchaseResponseQr extends AxiosResponse {
	data: PurchaseListResponseObject;
}

export interface PurchaseListResponseObject extends Purchases {
	createdAt: string;
	updatedAt: string;
	purchases_items: Purchases_Items[];
	user: Users;
}
