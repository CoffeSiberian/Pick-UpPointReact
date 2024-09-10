import { useState, useContext } from "react";
import { ShopCartContex } from "../hooks/ShopCartContex";
import ModalShopCart from "./ModalShopCart";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ShopCart = () => {
	const { shopCart } = useContext(ShopCartContex);
	const [open, setOpen] = useState<boolean>(false);

	const renderShopCart = (): JSX.Element => {
		return (
			<div className="fixed bottom-4 left-4">
				<Fab onClick={() => setOpen(!open)} variant="extended" color="success">
					<ShoppingCartIcon sx={{ mr: 1 }} />
					Carrito
				</Fab>
			</div>
		);
	};

	const verifyShowShopCart: boolean = !(
		shopCart === null || shopCart.length === 0
	);

	return (
		<>
			<ModalShopCart open={open} setOpen={setOpen} />
			{verifyShowShopCart && renderShopCart()}
		</>
	);
};

export default ShopCart;
