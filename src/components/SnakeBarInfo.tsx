import { FC, forwardRef } from "react";

// MUI
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	}
);

interface SnakeBarInfoProps {
	message: string;
	severity: "success" | "info" | "warning" | "error";
	duration?: number;
	open: boolean;
	handleClose: () => void;
}

const SnakeBarInfo: FC<SnakeBarInfoProps> = ({
	message,
	severity,
	duration = 5000,
	open,
	handleClose,
}) => {
	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar
				open={open}
				autoHideDuration={duration}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
};

export default SnakeBarInfo;
