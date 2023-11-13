import { useUser } from "../../../hooks/UserContex";
import { useDarkMode } from "../../../hooks/DarkModeContex";
import { Typography } from "@mui/material";

const Summary = () => {
    const { UserInfo } = useUser();
    const { themeTatailwind } = useDarkMode();

    return (
        <div>
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
        </div>
    );
};

export default Summary;
