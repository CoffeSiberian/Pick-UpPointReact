import { createContext, useState, useContext, useEffect } from "react";
import { DarkModeTypes, DarkModeContextTypes } from "../types/ContexTypes";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const DarkModeContex = createContext<DarkModeContextTypes>(
    {} as DarkModeContextTypes
);

export const useDarkMode = (): DarkModeContextTypes => {
    return useContext(DarkModeContex);
};

export const DarkMode = ({ children }: any) => {
    const [darkMode, setDarkModeState] = useState<boolean>(true);

    const darkMaterial = {
        palette: {
            primary: {
                main: "#404040",
            },
            secondary: {
                main: "#90caf9",
            },
        },
    };

    const lightMaterial = {
        palette: {
            primary: {
                main: "#3ca9d0",
            },
            secondary: {
                main: "#ed9427",
            },
        },
    };

    const darkTailwind: DarkModeTypes = {
        primary: {
            main: "bg-neutral-900",
            color: "white",
            border_color: "hover:border-cyan-600",
        },
        secondary: {
            main: "bg-stone-800",
            main_contrast: "bg-stone-600",
            color: "white",
            border_color: "hover:border-cyan-600",
        },
    };

    const lightTailwind: DarkModeTypes = {
        primary: {
            main: "bg-white",
            color: "black",
            border_color: "hover:border-cyan-600",
        },
        secondary: {
            main: "bg-gray-300",
            main_contrast: "bg-gray-200",
            color: "black",
            border_color: "hover:border-cyan-600",
        },
    };

    const themeMaterial = createTheme(
        darkMode
            ? {
                  ...darkMaterial,
                  palette: { ...darkMaterial.palette, mode: "dark" },
              }
            : {
                  ...lightMaterial,
                  palette: { ...lightMaterial.palette, mode: "light" },
              }
    );
    const themeTatailwind = darkMode ? darkTailwind : lightTailwind;

    const setDarkMode = (darkModeBool: boolean) => {
        localStorage.setItem("darkMode", darkModeBool.toString());
        setDarkModeState(darkModeBool);
    };

    useEffect(() => {
        const darkModeLocal = localStorage.getItem("darkMode");
        if (darkModeLocal !== null) {
            setDarkModeState(JSON.parse(darkModeLocal));
        } else {
            localStorage.setItem("darkMode", "true");
        }
    }, []);

    return (
        <DarkModeContex.Provider
            value={{ darkMode, themeTatailwind, setDarkMode }}
        >
            <ThemeProvider theme={themeMaterial}>{children}</ThemeProvider>
        </DarkModeContex.Provider>
    );
};
