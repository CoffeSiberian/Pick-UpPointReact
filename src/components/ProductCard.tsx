import { FC } from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useDarkMode } from "../hooks/DarkModeContex";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

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
    const { themeTatailwind } = useDarkMode();

    return (
        <div
            className={`flex flex-col ${themeTatailwind.secondary.main} rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl m-4 mb-12 p-4`}
        >
            <img
                className="object-cover rounded-xl drop-shadow-lg"
                src={img}
                alt="Los Andes VTC logo"
            />
            <div className="flex flex-col pb-2">
                <Link
                    className="flex justify-center p-2"
                    color={themeTatailwind.primary.color}
                    underline="none"
                >
                    <Typography variant="h6">{name}</Typography>
                </Link>
                <Divider />
                <Typography
                    component={"div"}
                    className="pt-2"
                    color={themeTatailwind.primary.color}
                    variant="body1"
                >
                    <div className="flex">
                        <Typography variant="body1">{description}</Typography>
                    </div>
                </Typography>
                <Typography
                    color={themeTatailwind.primary.color}
                    component={"div"}
                    className="flex pb-2 pt-5"
                    variant="h6"
                >
                    <Typography variant="body2">{category}</Typography>
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
            <div className="grid content-end h-full gap-3">
                <Button
                    variant="contained"
                    color="success"
                    endIcon={<ShoppingCartIcon />}
                >
                    Añadir al carrito
                </Button>
                <Button variant="contained" endIcon={<InfoIcon />}>
                    Ver detalles
                </Button>
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
