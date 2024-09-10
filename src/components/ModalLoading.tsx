import { useContext, FC } from "react";
import { DarkModeContex } from "../hooks/DarkModeContex";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

interface ModalLoadingProps {
	open: boolean;
}

const ModalLoading: FC<ModalLoadingProps> = ({ open }) => {
	const { darkMode } = useContext(DarkModeContex);

	return (
		<Dialog open={open} aria-describedby="loading-info">
			<DialogTitle>Loading...</DialogTitle>
			<DialogContent>
				<div className="flex items-center space-x-2">
					<CircularProgress color={darkMode ? "inherit" : "primary"} />
					<DialogContentText id="loading-info-text">
						This may take a few seconds
					</DialogContentText>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ModalLoading;
