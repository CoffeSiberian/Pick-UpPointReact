import { FC, useContext, useState } from "react";
import { formatDate } from "../../helpers/formatDate";
import { API_URL } from "../../helpers/configs";
import classNames from "classnames";

// Context and hooks
import { DarkModeContex } from "../../hooks/DarkModeContex";
import { UserContex } from "../../hooks/UserContex";
import Button from "@mui/material/Button";
import useFetch from "../../hooks/useFetch";

// MUI
import Typography from "@mui/material/Typography/Typography";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Portal } from "@mui/material";

// components
import SnakeBarInfo from "../SnakeBarInfo";

// icons
import CancelIcon from "@mui/icons-material/Cancel";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import NumbersIcon from "@mui/icons-material/Numbers";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

// types
import { StandarResponse } from "../../types/responses/StandarResponse";
import { ResponseError } from "../../types/responses/ResponseError";
import { PurchaseListResponseObject } from "../../types/responses/PurchaseList";

interface InfoScanResultProps {
	responsePurchase?: PurchaseListResponseObject;
}

const InfoScanResult: FC<InfoScanResultProps> = ({ responsePurchase }) => {
	const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];
	const { themeTatailwind } = useContext(DarkModeContex);
	const { UserInfo } = useContext(UserContex);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});

	const { loading, response, succes, setSucces } = useFetch(
		`${API_URL}/purchase/retired`,
		"PUT"
	);

	const dataRetired = async () => {
		if (!UserInfo) return;
		if (!responsePurchase) return;

		const data: StandarResponse | null = await response(
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			JSON.stringify({
				id: responsePurchase.id,
				retired: true,
				fk_user: responsePurchase.user.id,
			})
		);

		if (!data) {
			setError({
				status: 404,
				message: "No se pudo comprobar el codigo QR",
				error: true,
			});
			return;
		}
		if (data.status === 200) {
			setSucces(true);
			return;
		}

		setError({
			status: data.status,
			message: "No se pudo comprobar el codigo QR",
			error: true,
		});
	};

	const getClpString = (value: number) => {
		return value.toLocaleString("es-CL", {
			style: "currency",
			currency: "CLP",
		});
	};

	return (
		<>
			<Portal>
				<SnakeBarInfo
					open={succes}
					message="Se ha marcado como retirado correctamente"
					severity="success"
					handleClose={() => setSucces(false)}
				/>
				<SnakeBarInfo
					open={Error.error}
					message={Error.message}
					severity="error"
					handleClose={() => setError({ ...Error, error: false })}
				/>
			</Portal>
			<div
				className={classNames(
					"flex w-full max-w-md flex-col",
					themeTatailwind.secondary.main,
					"rounded-lg border-2 border-transparent",
					themeTatailwind.primary.border_color,
					"p-4 shadow-2xl"
				)}
			>
				<div className="flex h-full pb-2">
					<Typography variant="h6">
						<div className="flex items-center justify-center">
							<AccountCircleIcon className="mr-1" />
							<div>{responsePurchase ? responsePurchase.user.name : ""}</div>
						</div>
					</Typography>
				</div>
				<div className="flex h-full flex-col pb-2">
					<Typography
						component={"div"}
						className="pt-2"
						color={themeTatailwind.primary.color}
						variant="body1"
					>
						<div className="flex">
							<NumbersIcon className="mr-1" />
							<div>
								<b className="mr-2">Total:</b>
								{getClpString(responsePurchase ? responsePurchase.total : 0)}
							</div>
						</div>
						<div className="flex">
							<AssuredWorkloadIcon className="mr-1" />
							<div>
								<b className="mr-2">ID FLOW:</b>
								{responsePurchase ? responsePurchase.payment_id : ""}
							</div>
						</div>
						<div className="flex">
							<ScheduleIcon className="mr-1" />
							<div>
								<b className="mr-2">Fecha:</b>
								{responsePurchase ? formatDate(responsePurchase.date) : ""}
							</div>
						</div>
						<div className="flex">
							<InventoryIcon className="mr-1" />
							<div>
								<b className="mr-2">Retirado:</b>
								{responsePurchase ? (
									responsePurchase.retired ? (
										<OfflinePinIcon />
									) : (
										<CancelIcon />
									)
								) : (
									<CancelIcon />
								)}
							</div>
						</div>
						<div className="flex">
							<PaymentsIcon className="mr-1" />
							<div>
								<b className="mr-2">Pago:</b>
								{responsePurchase ? status[responsePurchase.status - 1] : ""}
							</div>
						</div>
					</Typography>
				</div>
				<div className="flex w-full justify-center gap-3">
					<LoadingButton
						disabled={
							!responsePurchase ||
							responsePurchase.retired ||
							responsePurchase.status !== 2
						}
						variant="contained"
						loading={loading}
						onClick={() => {
							dataRetired();
						}}
						color="error"
					>
						Marcar como retirado
					</LoadingButton>
					<Button
						disabled={!responsePurchase}
						variant="contained"
						color="warning"
						endIcon={<VisibilityIcon />}
					>
						Ver Carrito
					</Button>
				</div>
			</div>
		</>
	);
};

export default InfoScanResult;
