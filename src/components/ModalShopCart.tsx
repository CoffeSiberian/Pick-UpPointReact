import { FC, useRef } from "react";
import { useShopCart } from "../hooks/ShopCartContex";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import CloseIcon from "@mui/icons-material/Close";
import PaidIcon from "@mui/icons-material/Paid";

interface ModalShopCartProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalShopCart: FC<ModalShopCartProps> = ({ open, setOpen }) => {
    const { shopCart } = useShopCart();
    const total = useRef<number>(0);

    const renderShopCart = (): JSX.Element => {
        if (shopCart === null) return <></>;
        total.current = 0;

        const render = shopCart.map((item) => {
            total.current += item.price * item.quantity;
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

        const totalString = total.current.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
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
                <div className="flex flex-col gap-1 items-center mt-4">
                    <Typography variant="h6">Total: {totalString}</Typography>
                    <div>
                        <Button
                            color="success"
                            variant="outlined"
                            startIcon={<PaidIcon />}
                        >
                            Pagar
                        </Button>
                    </div>
                </div>
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
