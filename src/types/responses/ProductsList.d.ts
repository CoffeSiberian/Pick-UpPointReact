import { AxiosResponse } from "axios";
import { Products } from "../model";

export interface ProductsListResponse extends AxiosResponse {
    data: [Products];
}
