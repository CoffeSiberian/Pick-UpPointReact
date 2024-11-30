import { FC, useContext } from "react";

// Context and hooks
import { DarkModeContex } from "../hooks/DarkModeContex";
import { ShopCartContex } from "../hooks/ShopCartContex";

// MUI
import Typography from "@mui/material/Typography/Typography";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// types
import { ProductResponseObject } from "../types/responses/ProductsList";
import Button from "@mui/material/Button/Button";

interface ProductInfoViewProps {
	product: ProductResponseObject;
}

const ProductInfoView: FC<ProductInfoViewProps> = ({ product }) => {
	const { themeTatailwind } = useContext(DarkModeContex);
	const { addProduct } = useContext(ShopCartContex);

	return (
		<div className="flex max-w-md flex-col p-5">
			<div className="flex flex-col gap-3">
				<Typography color={themeTatailwind.primary.color} variant="h2">
					{product.name}
				</Typography>
				<Typography color={themeTatailwind.primary.color} variant="h6">
					{product.price.toLocaleString("es-CL", {
						style: "currency",
						currency: "CLP",
					})}
				</Typography>
				<Typography color={themeTatailwind.primary.color} variant="body1">
					Stock: {product.stock.quantity}
				</Typography>
			</div>
			<div className="flex pb-3 pt-3">
				<Typography color={themeTatailwind.primary.color} variant="body1">
					{product.description}
				</Typography>
			</div>
			<div>
				<Button
					startIcon={<ShoppingCartIcon />}
					color="success"
					variant="contained"
					onClick={() => {
						addProduct({
							id: product.id,
							name: product.name,
							price: product.price,
							quantity: 1,
						});
					}}
				>
					Agregar al Carrito
				</Button>
			</div>
		</div>
	);
};

export default ProductInfoView;
