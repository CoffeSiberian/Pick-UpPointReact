import { shopCartSch } from "../schemas/shopCartSch";

// types
import {
	ShopCartDataDefined,
	ShopCartDefined,
	ShopCartUndefined,
} from "../types/LocalShopCart";

export const getShopCart = async (): Promise<ShopCartDataDefined[] | null> => {
	try {
		const cartString: string | null = localStorage.getItem("shopcart");
		if (!cartString) throw new Error("No data found");

		const cart: ShopCartUndefined = JSON.parse(cartString);
		const cartValid = await shopCartSch.isValid(cart);

		if (!cartValid) throw new Error("Invalid data");

		return cart.cart as ShopCartDataDefined[];
	} catch {
		localStorage.removeItem("shopcart");
		return null;
	}
};

export const setShopCart = (data: ShopCartDefined): void => {
	localStorage.setItem("shopcart", JSON.stringify(data));
};

export const setShopCartClear = (): void => {
	localStorage.removeItem("shopcart");
};
