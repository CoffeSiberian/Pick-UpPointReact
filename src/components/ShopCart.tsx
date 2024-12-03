import { useState, useContext } from "react";

// Context and hooks
import { ShopCartContex } from "../hooks/ShopCartContex";

// MUI
import { Portal } from "@mui/base/Portal";
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// components
import ModalShopCart from "./ModalShopCart";

const ShopCart = () => {
	const { shopCart } = useContext(ShopCartContex);
	const [open, setOpen] = useState<boolean>(false);

	const verifyShowShopCart: boolean = !(
		shopCart === null || shopCart.length === 0
	);

	return (
		<Portal>
			<ModalShopCart open={open} setOpen={setOpen} />
			{verifyShowShopCart && (
				<div className="fixed bottom-4 left-4 z-10">
					<Fab
						onClick={() => setOpen(!open)}
						variant="extended"
						color="success"
					>
						<ShoppingCartIcon sx={{ mr: 1 }} />
						Carrito
					</Fab>
				</div>
			)}
		</Portal>
	);
};

export default ShopCart;
