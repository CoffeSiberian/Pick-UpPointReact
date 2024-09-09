import { useContext, FC } from "react";
import { Typography } from "@mui/material";
import { DarkModeContex } from "../hooks/DarkModeContex";
import classNames from "classnames";
import Divider from "@mui/material/Divider";

interface ErrorDataProps {
    title: string;
    message: string;
    footer: string;
}

const ErrorPage: FC<ErrorDataProps> = ({ title, message, footer }) => {
    const { themeTatailwind, darkMode } = useContext(DarkModeContex);

    return (
        <div className="flex justify-center w-full">
            <div
                className={classNames(
                    "flex flex-col items-center",
                    darkMode ? "bg-yellow-900" : "bg-yellow-600",
                    "rounded-xl gap-2 m-10 p-3"
                )}
            >
                <Typography variant="h4" color={themeTatailwind.primary.color}>
                    <b>{title}</b>
                </Typography>
                <Divider sx={{ mr: 1 }} variant="middle" flexItem />
                <Typography variant="h6" color={themeTatailwind.primary.color}>
                    {message}
                </Typography>

                <Typography
                    className="max-w-lg mt-3"
                    variant="caption"
                    color={themeTatailwind.primary.color}
                >
                    {footer}
                </Typography>
            </div>
        </div>
    );
};

export default ErrorPage;
