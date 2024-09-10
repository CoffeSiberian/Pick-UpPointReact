import { LocalJWTDefined } from "./LocalJWT";
import { ShopCartDataDefined } from "./LocalShopCart";

export interface DarkModeTypes {
	primary: {
		main: string;
		color: string;
		border_color: string;
	};
	secondary: {
		main: string;
		main_contrast: string;
		color: string;
		border_color: string;
	};
}

export interface DarkModeContextTypes {
	darkMode: boolean;
	themeTatailwind: DarkModeTypes;
	setDarkMode: (value: boolean) => void;
}

export interface UserContextTypes {
	UserInfo: LocalJWTDefined | null;
	setLocalJwt: (token: string) => void;
	logout: () => void;
}

export interface ShopCartContextTypes {
	shopCart: ShopCartDataDefined[] | null;
	addProduct: (data: ShopCartDataDefined) => void;
	delProduct: (id: string) => void;
	clearShopCart: () => void;
	setShopCart: (data: ShopCartDataDefined[]) => void;
}

export interface ProviderProps {
	children: ReactNode;
}
