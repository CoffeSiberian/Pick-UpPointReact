import { AxiosResponse } from "axios";
import { Products, Categories, Images_Products, Stocks } from "../model";

export interface ProductsListResponse extends AxiosResponse {
	data: { products: ProductResponseObject[] };
}

export interface ProductResponseObject extends Products {
	category: Categories;
	stock: Stocks;
	images: Images_Products[];
}

export interface ProductResponse extends AxiosResponse {
	data: Products;
}
