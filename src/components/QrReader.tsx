import { FC, useState, useEffect, useCallback, useRef } from "react";
import {
	Html5Qrcode,
	CameraDevice,
	Html5QrcodeCameraScanConfig,
} from "html5-qrcode";

// MUI
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface QrReaderProps {
	modalState: boolean;
	setScanResults: (results: string) => void;
	handelCloseModal: () => void;
}

const QrReader: FC<QrReaderProps> = ({
	modalState,
	setScanResults,
	handelCloseModal,
}) => {
	const [Permissions, setPermissions] = useState<boolean>(false);
	const [CameraId, setCameraId] = useState<string>("");
	const [ListCameras, setListCameras] = useState<CameraDevice[]>([]);

	const refCamera = useRef<Html5Qrcode | null>(null);

	const handleChange = async (event: SelectChangeEvent) => {
		setCameraId(event.target.value as string);

		if (refCamera.current) {
			await refCamera.current.stop();
			refCamera.current = null;
		}

		try {
			await startCamera(event.target.value);
		} catch {
			refCamera.current = null;
		}
	};

	const successCallback = useCallback(
		async (decodedText: string) => {
			if (refCamera.current !== null) {
				await refCamera.current.stop();
				refCamera.current = null;
			}

			setScanResults(decodedText);
			handelCloseModal();
		},
		[handelCloseModal, setScanResults]
	);

	const errorCallback = () => {};

	const startCamera = useCallback(
		async (cameraId?: string) => {
			const configs: Html5QrcodeCameraScanConfig = {
				fps: 10,
				qrbox: { width: 250, height: 250 },
			};

			if (refCamera.current === null) {
				refCamera.current = new Html5Qrcode("QrReaderDiv");
			}

			if (cameraId === undefined) {
				await refCamera.current.start(
					{ facingMode: "environment" },
					configs,
					(decode) => successCallback(decode),
					errorCallback
				);
			} else {
				await refCamera.current.start(
					{ deviceId: { exact: cameraId } },
					configs,
					(decode) => successCallback(decode),
					errorCallback
				);
			}
		},
		[successCallback]
	);

	const getCameras = useCallback(async () => {
		const camerasList = await Html5Qrcode.getCameras();

		if (camerasList && camerasList.length > 0) {
			setListCameras(camerasList);
			setPermissions(true);
			await startCamera();
			return;
		}

		setPermissions(false);
	}, [startCamera]);

	useEffect(() => {
		if (modalState === false) {
			if (refCamera.current !== null) {
				refCamera.current.stop().then(() => {
					refCamera.current = null;
				});
			}
		} else {
			getCameras();
		}
	}, [getCameras, modalState]);

	return (
		<div className="flex w-full flex-col items-center justify-center gap-2 p-3">
			<div
				className="my-2 max-w-xl"
				id="QrReaderDiv"
				style={{ width: "100%" }}
			></div>
			<div className="flex w-full max-w-md justify-center">
				{Permissions && (
					<FormControl fullWidth>
						<InputLabel color="info" id="camera-select-label">
							Selecciona una cámara
						</InputLabel>
						<Select
							id="camera-select"
							fullWidth
							value={CameraId}
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
				)}
			</div>
		</div>
	);
};

export default QrReader;
