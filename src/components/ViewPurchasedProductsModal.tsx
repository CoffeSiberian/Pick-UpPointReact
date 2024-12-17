import { FC } from "react";

// components
import ViewPurchasedProducts from "./ViewPurchasedProducts";
import ViewPurchasedProductsProfile from "./ViewPurchasedProductsProfile";

// MUI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { IconButton, Button } from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";

interface ModalLoadingProps {
	open: boolean;
	onClose: (open: boolean) => void;
	purchaseId: string | null;
	isProfile?: boolean;
}

const ViewPurchasedProductsModal: FC<ModalLoadingProps> = ({
	open,
	onClose,
	purchaseId,
	isProfile,
}) => {
	return (
		<Dialog
			open={open}
			onClose={() => onClose(false)}
			fullWidth={true}
			maxWidth="md"
		>
			<DialogTitle className="flex items-center justify-between">
				Lista de productos comprados
				<IconButton aria-label="Cerrar ventana" onClick={() => onClose(false)}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent className="flex justify-center">
				<div className="grid grid-cols-1 gap-7 md:grid-cols-2">
					{isProfile ? (
						<ViewPurchasedProductsProfile purchaseId={purchaseId} />
					) : (
						<ViewPurchasedProducts purchaseId={purchaseId} />
					)}
				</div>
			</DialogContent>
			<DialogActions>
				<Button color="error" variant="outlined" onClick={() => onClose(false)}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ViewPurchasedProductsModal;
