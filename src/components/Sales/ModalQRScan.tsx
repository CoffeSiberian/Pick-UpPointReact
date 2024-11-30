import { forwardRef, FC } from "react";

// MUI
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

// components
import QrReader from "../QrReader";

// icons
import CloseIcon from "@mui/icons-material/Close";

interface ModalQRScanProps {
	open: boolean;
	handleClose: () => void;
	setScanResults: (results: string) => void;
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<unknown>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ModalQRScan: FC<ModalQRScanProps> = ({
	open,
	handleClose,
	setScanResults,
}) => {
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Escanear QR
					</Typography>
				</Toolbar>
			</AppBar>
			<QrReader
				modalState={open}
				setScanResults={setScanResults}
				handelCloseModal={handleClose}
			/>
		</Dialog>
	);
};

export default ModalQRScan;
