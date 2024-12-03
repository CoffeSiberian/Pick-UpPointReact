import { useContext, FC } from "react";
import { STATIC_URL } from "../helpers/configs";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

// Context and hooks
import { ShopCartContex } from "../hooks/ShopCartContex";
import { DarkModeContex } from "../hooks/DarkModeContex";

// MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import testimg from "../static/img/test.png";

// types
import { Images_Products } from "../types/model";

interface ProductCardProps {
	id: string;
	name: string;
	img?: Images_Products;
	description: string;
	category: string;
	price: number;
}

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
				"flex w-full max-w-xs flex-col justify-center",
				themeTatailwind.secondary.main,
				"rounded-lg border-2 border-transparent",
				themeTatailwind.primary.border_color,
				"gap-2 p-4 shadow-md"
			)}
		>
			<div className="flex justify-center">
				<img
					className="max-h-72 rounded-xl object-contain drop-shadow-lg"
					src={img ? `${STATIC_URL}/${img.file_name}` : testimg}
					alt={name + " image"}
				/>
			</div>
			<div className="flex flex-col justify-end pb-2">
				<div className="flex flex-col gap-2">
					<Typography
						className="flex justify-center"
						color={themeTatailwind.primary.color}
						variant="h6"
					>
						<div className="font-bold">{name}</div>
					</Typography>
					<div className="flex justify-center">
						<Chip color="primary" size="small" label={category} />
					</div>
					<Divider />
					<Typography
						className="flex"
						color={themeTatailwind.primary.color}
						variant="body1"
					>
						{description}
					</Typography>
					<Typography
						color="success"
						component="div"
						className="flex"
						variant="h5"
					>
						<div className="font-bold">
							{price.toLocaleString("es-CL", {
								style: "currency",
								currency: "CLP",
							})}
						</div>
					</Typography>
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
		</div>
	);
};

export default ProductCard;
