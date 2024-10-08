import { useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { UserContex } from "../../../hooks/UserContex";
import { DarkModeContex } from "../../../hooks/DarkModeContex";
import { Typography } from "@mui/material";

const Summary = () => {
	const { UserInfo } = useContext(UserContex);
	const { themeTatailwind } = useContext(DarkModeContex);

	const chartData = () => {
		return (
			<PieChart
				series={[
					{
						data: [
							{ id: 0, value: 10, label: "Pendiente" },
							{ id: 1, value: 15, label: "Pagado" },
							{ id: 2, value: 3, label: "Rechazado" },
							{ id: 3, value: 7, label: "Anulado" },
						],
					},
				]}
				width={600}
				height={300}
			/>
		);
	};

	return (
		<div className="flex w-full justify-center">
			<div className="flex max-w-2xl flex-col gap-3">
				<Typography
					color={themeTatailwind.primary.color}
					variant="h4"
					className="text-center"
				>
					Resumen
				</Typography>
				<Typography
					color={themeTatailwind.primary.color}
					variant="h6"
					className="text-center"
				>
					Bienvenido <b>{UserInfo ? UserInfo.username : "Cargando..."}</b>
				</Typography>

				{chartData()}
			</div>
		</div>
	);
};

export default Summary;
