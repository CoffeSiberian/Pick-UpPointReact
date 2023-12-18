import { FC, useState, useEffect, useRef } from "react";
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

    const configs: Html5QrcodeCameraScanConfig = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
    };

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

    const successCallback = (decodedText: string, scaner: Html5Qrcode) => {
        scaner.stop();
        setScanResults(decodedText);
    };

    const errorCallback = (error: any) => {};

    const startCamera = async () => {
        if (CameraId === null) return;
        if (refCamera.current === null) return;
        if (refCamSelected.current === true) {
            await refCamera.current.stop();
        }

        await refCamera.current.start(
            { deviceId: { exact: CameraId } },
            configs,
            (decode) =>
                successCallback(decode, refCamera.current as Html5Qrcode),
            errorCallback
        );
        refCamSelected.current = true;
    };

    const listCameras = (): JSX.Element => {
        if (ListCameras === undefined) return <></>;

        return (
            <FormControl fullWidth>
                <InputLabel id="camera-select-label">
                    Selecciona una cámara
                </InputLabel>
                <Select
                    id="camera-select"
                    value={CameraId === null ? "" : CameraId}
                    label="Selecciona una cámara"
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

        startCamera(); // eslint-disable-next-line
    }, [CameraId]);

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div
                className="mb-4 max-w-xl"
                id="QrReaderDiv"
                style={{ width: "100%" }}
            ></div>
            <div className="flex justify-center mb-3 w-full max-w-md">
                {Permissions === false && (
                    <Button onClick={getCameras} variant="contained">
                        Permitir Usar Camara
                    </Button>
                )}
                {Permissions && listCameras()}
            </div>
        </div>
    );
};

export default QrReader;
