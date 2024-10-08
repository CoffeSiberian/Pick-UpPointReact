import { FC, useState, useEffect, useCallback, useRef } from "react";
import {
	Html5Qrcode,
	CameraDevice,
	Html5QrcodeCameraScanConfig,
} from "html5-qrcode";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

interface QrReaderProps {
	setScanResults: React.Dispatch<React.SetStateAction<string | null>>;
}

const QrReader: FC<QrReaderProps> = ({ setScanResults }) => {
	const [Permissions, setPermissions] = useState<boolean>(false);
	const [CameraId, setCameraId] = useState<string | null>(null);
	const [ListCameras, setListCameras] = useState<CameraDevice[]>();

	const refCamera = useRef<Html5Qrcode | null>(null);
	const refCamSelected = useRef<boolean>(false);

	const handleChange = (event: SelectChangeEvent) => {
		setCameraId(event.target.value as string);
	};

	const getCameras = async () => {
		const camerasList = await Html5Qrcode.getCameras();
		if (camerasList && camerasList.length > 0) {
			setListCameras(camerasList);
			setPermissions(true);
			return;
		}
		setPermissions(false);
	};

	const successCallback = useCallback(
		(decodedText: string, scaner: Html5Qrcode) => {
			scaner.stop();
			refCamSelected.current = false;
			setScanResults(decodedText);
		},
		[setScanResults]
	);

	const errorCallback = () => {};

	const startCamera = useCallback(async () => {
		const configs: Html5QrcodeCameraScanConfig = {
			fps: 10,
			qrbox: { width: 250, height: 250 },
		};

		if (CameraId === null) return;
		if (refCamera.current === null) return;
		if (refCamSelected.current === true) {
			await refCamera.current.stop();
		}

		await refCamera.current.start(
			{ deviceId: { exact: CameraId } },
			configs,
			(decode) => successCallback(decode, refCamera.current as Html5Qrcode),
			errorCallback
		);
		refCamSelected.current = true;
	}, [CameraId, successCallback]);

	const listCameras = (): JSX.Element => {
		if (ListCameras === undefined) return <></>;

		return (
			<FormControl fullWidth>
				<InputLabel id="camera-select-label">Selecciona una cámara</InputLabel>
				<Select
					id="camera-select"
					fullWidth
					value={CameraId === null ? "" : CameraId}
					label="Selecciona una cámara"
					color="info"
					onChange={handleChange}
				>
					{ListCameras.map((camera) => (
						<MenuItem key={camera.id} value={camera.id}>
							{camera.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	};

	useEffect(() => {
		if (refCamera.current === null) {
			refCamera.current = new Html5Qrcode("QrReaderDiv");
		}

		startCamera();
	}, [CameraId, startCamera]);

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<div
				className="mb-4 max-w-xl"
				id="QrReaderDiv"
				style={{ width: "100%" }}
			></div>
			<div className="mb-3 flex w-full max-w-md justify-center">
				{Permissions === false && (
					<Button color="warning" onClick={getCameras} variant="contained">
						Permitir Usar Camara
					</Button>
				)}
				{Permissions && listCameras()}
			</div>
		</div>
	);
};

export default QrReader;
