import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DarkModeContex } from "../../hooks/DarkModeContex";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import Button from "@mui/material/Button";

const RenderQrCode = () => {
	const { id } = useParams();
	const { themeTatailwind } = useContext(DarkModeContex);

	const onImageCownload = () => {
		const fileName = id ? id : "QRCode";
		const svg = document.getElementById("QRCode");
		if (svg === null) return;

		const svgData = new XMLSerializer().serializeToString(svg);
		const canvas = document.createElement("canvas");

		const ctx = canvas.getContext("2d");
		if (ctx === null) return;

		const img = new Image();
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const pngFile = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.download = fileName;
			downloadLink.href = `${pngFile}`;
			downloadLink.click();
		};

		img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
	};

	const renderQr = (): JSX.Element => {
		if (!id) return <></>;

		return (
			<>
				<QRCode id="QRCode" value={id} />
				<Button variant="contained" onClick={onImageCownload} color="success">
					Descargar QR
				</Button>
			</>
		);
	};

	return (
		<div className="flex justify-center">
			<div className="flex max-w-md flex-col items-center gap-3 p-2">
				<Typography color={themeTatailwind.primary.color} variant="h3">
					Código QR
				</Typography>
				<Typography color={themeTatailwind.primary.color} variant="body1">
					Recuerda
					<span style={{ color: "red" }}> descargar el código QR </span>
					para poder retirar tu producto de manera presencial.
				</Typography>
				{id ? renderQr() : <Typography>Id no encontrado</Typography>}
			</div>
		</div>
	);
};

export default RenderQrCode;
