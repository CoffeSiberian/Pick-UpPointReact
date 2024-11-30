import { useContext, useRef } from "react";

// Context and hooks
import { useParams } from "react-router-dom";
import { DarkModeContex } from "../../hooks/DarkModeContex";

// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// components
import { QRCodeCanvas } from "qrcode.react";

// icons
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const RenderQrCode = () => {
	const { id } = useParams();
	const { themeTatailwind } = useContext(DarkModeContex);
	const qrRef = useRef<HTMLDivElement | null>(null);

	const downloadQRCode = (fileName: string) => {
		if (!qrRef.current) return;

		const canvas = qrRef.current.querySelector("canvas");
		if (canvas) {
			const dataURL = canvas.toDataURL("image/png");
			const link = document.createElement("a");

			link.href = dataURL;
			link.download = fileName + ".png";
			link.click();
		}
	};

	return (
		<div className="my-4 flex justify-center">
			<div className="flex max-w-md flex-col items-center gap-3">
				<Typography color={themeTatailwind.primary.color} variant="h3">
					<div className="font-semibold">Código QR</div>
				</Typography>
				<Typography color={themeTatailwind.primary.color} variant="body1">
					Recuerda
					<span style={{ color: "red" }}> descargar el código QR </span>
					para poder retirar tu producto de manera presencial.
				</Typography>
				{id ? (
					<>
						<div ref={qrRef}>
							<QRCodeCanvas
								style={{
									width: "100%",
									maxWidth: "100%",
									height: "100%",
									padding: "10px",
								}}
								value={id}
								size={512}
								bgColor={"#ffffff"}
								fgColor={"#000000"}
								level={"M"}
								marginSize={1}
								minVersion={4}
							/>
						</div>
						<Button
							variant="contained"
							onClick={() => downloadQRCode(`qrcode-${id}`)}
							color="success"
							endIcon={<CloudDownloadIcon />}
						>
							Descargar QR
						</Button>
					</>
				) : (
					<Typography>Id no encontrado</Typography>
				)}
			</div>
		</div>
	);
};

export default RenderQrCode;
