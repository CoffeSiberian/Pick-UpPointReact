import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { API_URL } from "../../../helpers/configs";
import { formatOnlyDateNoYear } from "../../../helpers/formatDate";

// Context and hooks
import useFetch from "../../../hooks/useFetch";
import { UserContex } from "../../../hooks/UserContex";
import { DarkModeContex } from "../../../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";

// types
import {
	PurchasesTotalMonthResponse,
	PurchaseTotalObject,
} from "../../../types/responses/Purchase";

const Summary = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const { themeTatailwind } = useContext(DarkModeContex);

	const { response } = useFetch(`${API_URL}/purchases/total/month`, "GET");

	const [totalMoth, setTotalMonth] = useState<PurchaseTotalObject[]>([]);

	const getStats = useCallback(async () => {
		if (!UserInfo) return;

		const data: PurchasesTotalMonthResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setTotalMonth(data.data.purchases);
		}
	}, [UserInfo, response]);

	useEffect(() => {
		if (!loaded.current) {
			getStats();
			loaded.current = true;
		}
	}, [getStats]);

	return (
		<div className="flex w-full justify-center">
			<div className="flex w-full flex-col gap-3">
				<div className="flex flex-col gap-3">
					<Typography
						color={themeTatailwind.primary.color}
						variant="h4"
						className="text-center"
					>
						<div className="font-bold">Resumen</div>
					</Typography>
					<Typography
						color={themeTatailwind.primary.color}
						variant="h6"
						className="text-center"
					>
						Bienvenido <b>{UserInfo ? UserInfo.username : "Cargando..."}</b>
					</Typography>
				</div>
				<div className="flex w-full flex-col items-center gap-3">
					<div>
						<ButtonGroup variant="contained" color="success">
							<Button>30 Dias</Button>
							<Button>7 dias</Button>
						</ButtonGroup>
					</div>
					{totalMoth.length > 0 && (
						<div className="flex w-full max-w-6xl flex-col justify-center gap-4 p-3 md:flex-row">
							<Paper
								sx={{
									width: "100%",
									height: 500,
									p: 1,
									borderRadius: 5,
								}}
								elevation={3}
							>
								<ResponsiveChartContainer
									dataset={totalMoth.map((item) => ({
										date: formatOnlyDateNoYear(item.date),
										total_sales: item.total_sales,
										total_money: item.total_money,
									}))}
									series={[
										{
											label: "Ventas",
											dataKey: "total_money",
											type: "bar",
										},
									]}
									xAxis={[{ scaleType: "band", dataKey: "date" }]}
									height={500}
								>
									<BarPlot />
									<ChartsYAxis />
									<ChartsXAxis />
									<ChartsTooltip />
									<ChartsAxisHighlight x="band" y="line" />
								</ResponsiveChartContainer>
							</Paper>
							<div className="flex w-full max-w-44 flex-col items-center gap-3">
								<Typography
									color={themeTatailwind.primary.color}
									component="div"
									className="flex"
									variant="h5"
								>
									<div className="font-bold">Ganancia total</div>
								</Typography>
								<Typography
									color="success"
									component="div"
									className="flex"
									variant="h5"
								>
									<div className="font-bold">
										{totalMoth
											.reduce((acc, item) => acc + item.total_money, 0)
											.toLocaleString("es-CL", {
												style: "currency",
												currency: "CLP",
											})}
									</div>
								</Typography>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Summary;
