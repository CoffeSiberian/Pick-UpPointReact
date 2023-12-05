import { FC } from "react";
import { useShopCart } from "../hooks/ShopCartContex";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import CloseIcon from "@mui/icons-material/Close";

interface ModalShopCartProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalShopCart: FC<ModalShopCartProps> = ({ open, setOpen }) => {
    const { shopCart } = useShopCart();

    const renderShopCart = (): JSX.Element => {
        if (shopCart === null) return <></>;

        const render = shopCart.map((item) => {
            return (
                <div className="flex flex-row" key={item.id}>
                    <div className="grid grid-cols-4 w-full">
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body1">
                            {item.price.toLocaleString("es-CL", {
                                style: "currency",
                                currency: "CLP",
                            })}
                        </Typography>
                        <Typography variant="body1">{item.quantity}</Typography>
                        <Typography variant="body1">
                            {(item.price * item.quantity).toLocaleString(
                                "es-CL",
                                {
                                    style: "currency",
                                    currency: "CLP",
                                }
                            )}
                        </Typography>
                    </div>
                </div>
            );
        });
        return (
            <div className="flex flex-col w-full">
                <div className="grid grid-cols-4">
                    <Typography variant="h6">Nombre</Typography>
                    <Typography variant="h6">Precio</Typography>
                    <Typography variant="h6">Cantidad</Typography>
                    <Typography variant="h6">Total Producto</Typography>
                </div>
                {render}
            </div>
        );
    };

    return (
        <Dialog
            onClose={() => setOpen(false)}
            open={open}
            aria-describedby="loading-info"
            fullWidth
        >
            <DialogTitle className="flex justify-between">
                Tu carrito de compra
                <IconButton
                    aria-label="Cerrar ventana"
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>{renderShopCart()}</DialogContent>
        </Dialog>
    );
};

export default ModalShopCart;
