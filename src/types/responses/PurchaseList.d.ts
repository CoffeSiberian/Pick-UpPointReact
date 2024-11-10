import { AxiosResponse } from "axios";
import { Purchases, Purchases_Items, Users, Products } from "../model";

export interface Purchases_Items_Response extends Purchases_Items {
	product: Products;
}

export interface PurchaseListResponse extends AxiosResponse {
	data: { purchases: Purchases[] };
}

export interface PurchaseListResponseWithUser extends AxiosResponse {
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

export interface ItemsPurchasedListResponse extends AxiosResponse {
	data: { itemsPurchased: Purchases_Items_Response[] };
}
