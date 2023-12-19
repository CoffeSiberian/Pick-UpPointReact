import { PieChart } from "@mui/x-charts/PieChart";
import { useUser } from "../../../hooks/UserContex";
import { useDarkMode } from "../../../hooks/DarkModeContex";
import { Typography } from "@mui/material";

const Summary = () => {
    const { UserInfo } = useUser();
    const { themeTatailwind } = useDarkMode();

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
        <div className="flex justify-center w-full">
            <div className="flex flex-col gap-3 max-w-2xl">
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
                    Bienvenido{" "}
                    <b>{UserInfo ? UserInfo.username : "Cargando..."}</b>
                </Typography>

                {chartData()}
            </div>
        </div>
    );
};

export default Summary;
