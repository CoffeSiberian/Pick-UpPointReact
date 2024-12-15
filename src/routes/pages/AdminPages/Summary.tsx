import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { API_URL } from "../../../helpers/configs";
import { formatOnlyDateNoYear } from "../../../helpers/formatDate";
import dayjs from "dayjs";

// Context and hooks
import useFetch from "../../../hooks/useFetch";
import { UserContex } from "../../../hooks/UserContex";
import { DarkModeContex } from "../../../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// icons
import SearchIcon from "@mui/icons-material/Search";

// types
import {
	PurchasesTotalMonthResponse,
	PurchaseTotalObject,
} from "../../../types/responses/Purchase";

interface DateRange {
	date_start: dayjs.Dayjs | null;
	date_end: dayjs.Dayjs | null;
}

const Summary = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const { themeTatailwind } = useContext(DarkModeContex);

	const { response, loading } = useFetch(`${API_URL}/purchases/total`, "GET");

	const [totalMoth, setTotalMonth] = useState<PurchaseTotalObject[]>([]);
	const [dateRange, setDateRange] = useState<DateRange>({
		date_start: dayjs().subtract(30, "day"),
		date_end: dayjs(),
	});

	const getStats = useCallback(
		async (date_start: string, date_end: string) => {
			if (!UserInfo) return;

			const data: PurchasesTotalMonthResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
				params: {
					date_start,
					date_end,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setTotalMonth(data.data.purchases);
			}
		},
		[UserInfo, response]
	);

	useEffect(() => {
		if (!loaded.current) {
			getStats(
				dateRange.date_start?.format("YYYY-MM-DD") || "",
				dateRange.date_end?.format("YYYY-MM-DD") || ""
			);
			loaded.current = true;
		}
	}, [dateRange.date_end, dateRange.date_start, getStats]);

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
					<div className="flex flex-col gap-3 md:flex-row">
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Desde la fecha"
								views={["day", "month", "year"]}
								format="DD-MM-YYYY"
								value={dateRange.date_start}
								onChange={(date) =>
									setDateRange({ ...dateRange, date_start: date })
								}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label="Hasta la fecha"
								views={["day", "month", "year"]}
								format="DD-MM-YYYY"
								value={dateRange.date_end}
								onChange={(date) =>
									setDateRange({ ...dateRange, date_end: date })
								}
							/>
						</LocalizationProvider>
						<LoadingButton
							variant="contained"
							loading={loading}
							onClick={() => {
								getStats(
									dateRange.date_start?.format("YYYY-MM-DD") || "",
									dateRange.date_end?.format("YYYY-MM-DD") || ""
								);
							}}
							endIcon={<SearchIcon />}
						>
							Filtrar
						</LoadingButton>
					</div>
					{totalMoth.length > 0 && (
						<div className="flex w-full max-w-6xl flex-col items-center justify-center gap-4 p-3 md:flex-row">
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
