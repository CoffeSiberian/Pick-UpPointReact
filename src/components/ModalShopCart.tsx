import { FC, useState, useEffect, useContext, useRef } from "react";
import { API_URL } from "../helpers/configs";

// Context and hooks
import { ShopCartContex } from "../hooks/ShopCartContex";
import { UserContex } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";

// MUI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// components
import ModalLoading from "./ModalLoading";
import ModalError from "./ModalError";
import SnakeBarInfo from "./SnakeBarInfo";

// icons
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from "@mui/icons-material/Paid";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// types
import { PurchaseResponse } from "../types/responses/Purchase";
import { ResponseError } from "../types/responses/ResponseError";

interface ModalShopCartProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const ModalShopCart: FC<ModalShopCartProps> = ({ open, setOpen }) => {
	const { shopCart, setShopCart, delProduct, clearShopCart } =
		useContext(ShopCartContex);
	const { UserInfo } = useContext(UserContex);
	const { loading, response } = useFetch(`${API_URL}/purchase`, "POST");

	const total = useRef<number>(0);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});

	const sendData = async () => {
		if (UserInfo === null) {
			setError({
				status: 401,
				message: "Error, Inicia sesion para continuar",
				error: true,
			});
			return;
		}

		if (shopCart === null) return;
		if (shopCart.length === 0) return;

		const purchaseItemsToSend = shopCart.map((item) => {
			return { id: item.id, quantity: item.quantity };
		});

		const data: PurchaseResponse | null = await response(
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			JSON.stringify({
				products: purchaseItemsToSend,
			})
		);

		if (data === null) {
			setError({
				status: 500,
				message: "Error, Intenta mas tarde",
				error: true,
			});
			return;
		}
		if (data.status !== 200) {
			setError({
				status: data.status,
				message: "Error, Intenta mas tarde",
				error: true,
			});
			return;
		}

		clearShopCart();
		window.open(data.data.url_pay, "_blank");
	};

	const renderShopCart = (): JSX.Element => {
		if (shopCart === null) return <></>;
		total.current = 0;

		const render = shopCart.map((item) => {
			total.current += item.price * item.quantity;

			return (
				<div className="flex justify-center" key={item.id}>
					<div className="flex w-full flex-col border-red-600 md:w-2/4">
						<Typography variant="h6" className="flex justify-between">
							{item.name}
							<IconButton
								aria-label="aumentar cantidad"
								size="small"
								onClick={() => delProduct(item.id)}
							>
								<DeleteIcon />
							</IconButton>
						</Typography>
						<Typography
							className="flex items-center justify-between"
							variant="body1"
						>
							<div>
								<IconButton
									aria-label="disminuir cantidad"
									size="small"
									onClick={() => changeQuantity(item.id, item.quantity - 1)}
								>
									<KeyboardArrowDownIcon />
								</IconButton>
								{item.quantity}
								<IconButton
									aria-label="aumentar cantidad"
									size="small"
									onClick={() => changeQuantity(item.id, item.quantity + 1)}
								>
									<KeyboardArrowUpIcon />
								</IconButton>
							</div>
							{(item.price * item.quantity).toLocaleString("es-CL", {
								style: "currency",
								currency: "CLP",
							})}
						</Typography>
					</div>
				</div>
			);
		});

		const changeQuantity = (id: string, quantity: number) => {
			if (quantity < 1) return;
			if (quantity > 100) return;

			const newShopCart = shopCart.map((item) => {
				if (item.id === id) {
					item.quantity = quantity;
				}
				return item;
			});

			setShopCart(newShopCart);
		};

		const totalString = total.current.toLocaleString("es-CL", {
			style: "currency",
			currency: "CLP",
		});

		return (
			<div className="flex w-full flex-col">
				{render}
				<div className="mt-4 flex flex-col items-center gap-1">
					<Typography variant="h6">Total: {totalString}</Typography>
					<div>
						<Button
							color="success"
							variant="outlined"
							startIcon={<PaidIcon />}
							onClick={sendData}
						>
							Pagar
						</Button>
					</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		if (shopCart === null) {
			setOpen(false);
		} else if (shopCart.length === 0) {
			setOpen(false);
		}
	}, [shopCart, setOpen]);

	return (
		<>
			<ModalError
				open={Error.error}
				message={Error.message}
				setError={() => setError({ ...Error, error: false })}
			/>
			<ModalLoading open={loading} />
			<SnakeBarInfo
				open={Error.error}
				message={Error.message}
				severity="error"
				handleClose={() => setError({ ...Error, error: false })}
			/>
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
		</>
	);
};

export default ModalShopCart;
