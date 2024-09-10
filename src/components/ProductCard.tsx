import { useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import { ShopCartContex } from "../hooks/ShopCartContex";
import { DarkModeContex } from "../hooks/DarkModeContex";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import classNames from "classnames";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";

const ProductCard: FC<ProductCardProps> = ({
	id,
	name,
	img,
	category,
	description,
	price,
}) => {
	const { themeTatailwind } = useContext(DarkModeContex);
	const { addProduct } = useContext(ShopCartContex);
	const navigate = useNavigate();

	const handleAddProduct = () => {
		addProduct({
			id,
			name,
			price,
			quantity: 1,
		});
	};

	return (
		<div
			className={classNames(
				"flex w-full max-w-xs flex-col",
				themeTatailwind.secondary.main,
				"rounded-lg border-2 border-transparent",
				themeTatailwind.primary.border_color,
				"m-4 mb-12 p-4 shadow-2xl"
			)}
		>
			<img
				className="rounded-xl object-cover drop-shadow-lg"
				src={img}
				alt="store"
			/>
			<div className="flex h-full flex-col pb-2">
				<Link
					className="flex justify-center p-2"
					color={themeTatailwind.primary.color}
					underline="none"
				>
					<Typography variant="h6">{name}</Typography>
				</Link>
				<Divider />
				<Typography
					className="flex h-full pt-1"
					color={themeTatailwind.primary.color}
					variant="body1"
				>
					{description}
				</Typography>
				<Typography
					color={themeTatailwind.primary.color}
					className="flex pb-2 pt-5"
					variant="body2"
				>
					{category}
				</Typography>
				<Divider />
				<Typography
					color={themeTatailwind.primary.color}
					component={"div"}
					className="flex pb-2 pt-2"
					variant="h6"
				>
					{price.toLocaleString("es-CL", {
						style: "currency",
						currency: "CLP",
					})}
				</Typography>
			</div>
			<div className="flex w-full flex-col items-center justify-end">
				<div className="flex w-full justify-around gap-3">
					<Button
						variant="contained"
						size="small"
						startIcon={<InfoIcon />}
						onClick={() => navigate(`/product/${id}`)}
					>
						Ver detalles
					</Button>
					<IconButton
						aria-label="add-card"
						color="success"
						size="small"
						onClick={handleAddProduct}
					>
						<ShoppingCartIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;

interface ProductCardProps {
	id: string;
	name: string;
	img: string;
	description: string;
	category: string;
	price: number;
}
