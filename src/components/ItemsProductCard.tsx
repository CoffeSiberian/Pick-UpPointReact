import { useContext, FC } from "react";
import classNames from "classnames";
import { STATIC_URL } from "../helpers/configs";

// Context and hooks
import { DarkModeContex } from "../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
	quantity: number;
}

const ItemsProductCard: FC<ProductCardProps> = ({
	id,
	name,
	img,
	category,
	description,
	price,
	quantity,
}) => {
	const { themeTatailwind } = useContext(DarkModeContex);

	return (
		<div
			key={id}
			className={classNames(
				"flex w-full max-w-xs flex-col",
				themeTatailwind.secondary.main,
				"rounded-lg border-2 border-transparent",
				themeTatailwind.primary.border_color,
				"gap-2 p-4 shadow-2xl"
			)}
		>
			<img
				className="rounded-xl object-cover drop-shadow-lg"
				src={img ? `${STATIC_URL}/${img.file_name}` : testimg}
				alt="store"
			/>
			<div className="flex flex-col pb-2">
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
					<Typography
						color={themeTatailwind.primary.color}
						component="div"
						className="flex justify-between"
						variant="subtitle2"
					>
						<div className="flex gap-1">
							<ShoppingCartIcon />
							Cantidad comprado:
						</div>
						<Chip color="warning" size="small" label={quantity} />
					</Typography>
					<Button
						variant="contained"
						size="small"
						startIcon={<OpenInNewIcon />}
						href={`/product/${id}`}
						target="_blank"
					>
						Ver producto
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ItemsProductCard;
