import { createContext, useState, useContext, useEffect } from "react";
import {
    getShopCart,
    setShopCart as setLocalShopCart,
    setShopCartClear,
} from "../helpers/LocalShopCart";
import { ShopCartContextTypes } from "../types/ContexTypes";
import { ShopCartDataDefined } from "../types/LocalShopCart";

const ShopCartContex = createContext<ShopCartContextTypes>(
    {} as ShopCartContextTypes
);

export const useShopCart = (): ShopCartContextTypes => {
    return useContext(ShopCartContex);
};

export const ShopCartInfo = ({ children }: any) => {
    const [shopCart, setShopCart] = useState<ShopCartDataDefined[] | null>(
        null
    );

    const addProduct = (product: ShopCartDataDefined) => {
        if (shopCart === null) {
            setShopCart([product]);
            return;
        }
        let ProductAndStock: ShopCartDataDefined = product;

        const newShopCart = shopCart.filter((productCart) => {
            if (productCart.id === product.id) {
                ProductAndStock = {
                    ...productCart,
                    quantity: productCart.quantity + product.quantity,
                };
                return false;
            }
            return true;
        });

        newShopCart.push(ProductAndStock);

        setShopCart(newShopCart);
        setLocalShopCart({
            cart: newShopCart,
        });
    };

    const delProduct = (id: string) => {
        if (shopCart === null) return;
        const newShopCart = shopCart.filter((product) => product.id !== id);

        setShopCart(newShopCart);
        setLocalShopCart({
            cart: newShopCart,
        });
    };

    const clearShopCart = () => {
        setShopCart(null);
        setShopCartClear();
    };

    const getLocalShopCart = async () => {
        const localShopCart = await getShopCart();
        if (localShopCart === null) return;
        setShopCart(localShopCart);
    };

    useEffect(() => {
        getLocalShopCart();
    }, []);

    return (
        <ShopCartContex.Provider
            value={{
                shopCart,
                setShopCart,
                addProduct,
                delProduct,
                clearShopCart,
            }}
        >
            {children}
        </ShopCartContex.Provider>
    );
};
