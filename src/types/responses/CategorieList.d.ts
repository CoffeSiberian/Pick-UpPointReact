import { AxiosResponse } from "axios";
import { Categories } from "../model";

export interface CategoriesListResponse extends AxiosResponse {
	data: Categories[];
}
