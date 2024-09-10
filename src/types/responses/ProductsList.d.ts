import { AxiosResponse } from "axios";
import { Products, Categories, Images_Products, Stocks } from "../model";

export interface ProductsListResponse extends AxiosResponse {
	data: ProductResponseObject[];
}

export interface ProductResponseObject extends Products {
	category: Categories;
	stock: Stocks;
	images: Images_Products[];
}
