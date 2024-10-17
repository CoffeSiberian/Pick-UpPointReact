import { AxiosResponse } from "axios";
import { Users } from "../model";

export interface UserListResponse extends AxiosResponse {
	data: { users: Users[] };
}
