import { FC } from "react";

// components
import ViewPurchasedProducts from "./ViewPurchasedProducts";

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
}

const ViewPurchasedProductsModal: FC<ModalLoadingProps> = ({
	open,
	onClose,
	purchaseId,
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
			<DialogContent>
				<ViewPurchasedProducts purchaseId={purchaseId} />
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
