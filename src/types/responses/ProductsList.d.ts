import { AxiosResponse } from "axios";
import { Products, Categories, Images_Products, Stocks } from "../model";

export interface ProductsListResponseObject {
	products: ProductResponseObject[];
	total_products: number;
}

export interface ProductsListResponse extends AxiosResponse {
	data: ProductsListResponseObject;
}

export interface ProductResponseObject extends Products {
	category: Categories;
	stock: Stocks;
	images: Images_Products[];
	primary_image?: Images_Products;
}

export interface ProductResponse extends AxiosResponse {
	data: Products;
}
