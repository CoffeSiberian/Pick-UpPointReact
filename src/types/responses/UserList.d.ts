import { AxiosResponse } from "axios";
import { Users, Purchases } from "../model";

interface UserWithPurchases extends Users {
	totalPurchases: number;
	totalSpent: number;
	purchases: Purchases[];
}

export interface UserListResponse extends AxiosResponse {
	data: { users: Users[] };
}

export interface UserAllInfoResponse extends AxiosResponse {
	data: UserWithPurchases;
}
