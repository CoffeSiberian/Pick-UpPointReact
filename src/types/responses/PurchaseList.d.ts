import { AxiosResponse } from "axios";
import { Purchases } from "../model";

export interface PurchaseListResponse extends AxiosResponse {
    data: PurchaseListResponseObject[];
}

export interface PurchaseListResponseObject {
    id: string;
    total: number;
    date: string;
    status: number;
    payment_method: number;
    payment_id: string;
    payment_successful: boolean;
    retired: boolean;
    fk_user: string;
    fk_store: string;
    createdAt: string;
    updatedAt: string;
    purchases_items: PurchasesItem[];
    user: User;
}

export interface PurchasesItem {
    id: string;
    quantity: number;
    price: number;
    fk_purchase: string;
    fk_product: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    fk_store: string;
    createdAt: string;
    updatedAt: string;
}
