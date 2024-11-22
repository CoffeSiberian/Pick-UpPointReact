import { FC } from "react";

// MUI
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalErrorProps {
	open: boolean;
	message: string;
	setError: () => void;
}

const ModalError: FC<ModalErrorProps> = ({ open, message, setError }) => {
	return (
		<Dialog open={open} onClose={setError} aria-describedby="loading-info">
			<DialogTitle>Error</DialogTitle>
			<DialogContent>
				<div className="flex items-center space-x-2">
					<Typography className="break-words">{message}</Typography>
				</div>
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={() => setError()}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalError;
