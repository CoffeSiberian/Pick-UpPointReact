import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../helpers/configs";
import classNames from "classnames";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

// MUI
import TextField from "@mui/material/TextField";
import { Portal } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

// modals

// components
import InfoScanResult from "../../../../components/Sales/InfoScanResult";
import SnakeBarInfo from "../../../../components/SnakeBarInfo";
import ModalQRScan from "../../../../components/Sales/ModalQRScan";

// types
import { ResponseError } from "../../../../types/responses/ResponseError";
import {
	PurchaseResponseQr,
	PurchaseListResponseObject,
} from "../../../../types/responses/PurchaseList";

// icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SearchIcon from "@mui/icons-material/Search";

const ViewSale = () => {
	const navigate = useNavigate();
	const { UserInfo } = useContext(UserContex);

	const [QrModal, setQrModal] = useState<boolean>(false);
	const [QrValue, setQrValue] = useState<string>("");
	const [Response, setResponse] = useState<
		PurchaseListResponseObject | undefined
	>(undefined);

	const { loading, response, succes, setSucces } = useFetch(
		`${API_URL}/purchase/check`,
		"GET"
	);

	const [Error, setError] = useState<ResponseError>({
		status: 200,
		message: "",
		error: false,
	});

	const checkQr = async () => {
		if (!UserInfo) return;
		if (!QrValue) return;

		const data: PurchaseResponseQr | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
			params: {
				id: QrValue,
			},
		});

		if (!data) {
			setError({
				status: 404,
				message: "No se pudo comprobar el codigo QR",
				error: true,
			});
			return;
		}
		if (data.status === 200) {
			setResponse(data.data);
			return;
		}

		setResponse(undefined);
		setError({
			status: data.status,
			message: "No se pudo comprobar el codigo QR",
			error: true,
		});
	};

	return (
		<>
			<Portal>
				<SnakeBarInfo
					open={succes}
					message="Se ha leido el codigo QR correctamente"
					severity="success"
					handleClose={() => setSucces(false)}
				/>
				<SnakeBarInfo
					open={Error.error}
					message={Error.message}
					severity="error"
					handleClose={() => setError({ ...Error, error: false })}
				/>
				<ModalQRScan
					open={QrModal}
					handleClose={() => setQrModal(false)}
					setScanResults={(results) => setQrValue(results)}
				/>
			</Portal>
			<div className="flex w-full justify-center">
				<div className="flex w-full max-w-4xl flex-col gap-3 p-3">
					<div className={classNames("flex w-full justify-between")}>
						<Button
							color="info"
							variant="contained"
							startIcon={<ArrowBackIosNewIcon />}
							onClick={() => navigate("/admin/sales/")}
						>
							Atras
						</Button>
						<Button
							color="primary"
							onClick={() => setQrModal(true)}
							variant="contained"
							endIcon={<QrCodeScannerIcon />}
						>
							Verificar QR
						</Button>
					</div>
					<div className="flex justify-center">
						<div className="my-3 flex flex-col gap-5">
							<div className="flex flex-col gap-3">
								<TextField
									label="Codigo de compra"
									variant="filled"
									color="info"
									value={QrValue}
									onChange={(e) => setQrValue(e.target.value)}
								/>
								<LoadingButton
									color="secondary"
									variant="contained"
									onClick={checkQr}
									endIcon={<SearchIcon />}
									loading={loading}
								>
									Verificar
								</LoadingButton>
							</div>
							<InfoScanResult responsePurchase={Response} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewSale;
