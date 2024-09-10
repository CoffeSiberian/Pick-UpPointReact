interface ShopCartDataUndefined {
	id: string | undefined;
	name: string | undefined;
	price: number | undefined;
	quantity: number | undefined;
}

export interface ShopCartDataDefined {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

interface ShopCartDefined {
	cart: ShopCartDataDefined[];
}

interface ShopCartUndefined {
	cart: ShopCartDataUndefined[];
}
