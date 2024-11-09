import { AxiosResponse } from "axios";
import { Users, Purchases } from "../model";

interface UserWithPurchases extends Users {
	purchases: Purchases[];
}

export interface UserListResponse extends AxiosResponse {
	data: { users: Users[] };
}

export interface UserAllInfoResponse extends AxiosResponse {
	data: { user: UserWithPurchases; totalPurchases: number; totalSpent: number };
}
