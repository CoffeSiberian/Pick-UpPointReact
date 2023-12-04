import { FC } from "react";
import IconButton from "@mui/material/IconButton";
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
            className={`flex flex-col max-w-xs w-full ${themeTatailwind.secondary.main} rounded-lg border-2 border-transparent ${themeTatailwind.primary.border_color} shadow-2xl m-4 mb-12 p-4`}
        >
            <img
                className="object-cover rounded-xl drop-shadow-lg"
                src={img}
                alt="store"
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
                    className="flex pt-1"
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
            <div className="flex flex-col items-center justify-end h-full w-full">
                <div className="flex justify-around w-full gap-3">
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<InfoIcon />}
                    >
                        Ver detalles
                    </Button>
                    <IconButton
                        aria-label="add-card"
                        color="success"
                        size="small"
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
