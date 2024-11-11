import { AxiosResponse } from "axios";
import { Users } from "../model";

export interface UserListResponse extends AxiosResponse {
	data: { users: Users[] };
}

export interface UserAllInfoResponse extends AxiosResponse {
	data: { user: Users; totalPurchases: number; totalSpent: number };
}
