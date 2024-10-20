import {
	//useState,
	FC,
	useEffect,
	useContext,
	useRef,
	useCallback,
} from "react";
import { UserContex } from "../../../../hooks/UserContex";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// icons
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// types
import { PurchaseListResponse } from "../../../../types/responses/PurchaseList";

const UserSalesModal: FC<UserModalSalesProps> = ({
	open,
	openUserSalesProps,
	username,
	userId,
}) => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const { response } = useFetch(
		`${API_URL}/purchases/user?id=${userId}&limit_start=0&limit_end=10`,
		"GET"
	);
	/*  
	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});
	*/

	const getUserSales = useCallback(async () => {
		if (!UserInfo) return;

		const data: PurchaseListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			return;
		}
	}, [UserInfo, response]);

	useEffect(() => {
		if (open && !loaded.current) {
			loaded.current = true;
			getUserSales();
		}
		if (!open) {
			loaded.current = false;
		}
	}, [open, getUserSales]);

	return (
		<>
			<Dialog
				open={open}
				keepMounted={false}
				onClose={() => openUserSalesProps(false)}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				scroll="paper"
				fullWidth
			>
				<DialogTitle className="flex justify-between">
					Pagos de {username}
					<IconButton
						aria-label="Cerrar ventana"
						onClick={() => openUserSalesProps(false)}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent></DialogContent>
				<DialogActions>
					<Button
						color="info"
						size="small"
						variant="contained"
						endIcon={<CancelIcon />}
						onClick={() => {
							openUserSalesProps(false);
						}}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UserSalesModal;
