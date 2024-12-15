import { createContext, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { esES } from "@mui/x-date-pickers/locales";
import { esES as coreEs } from "@mui/material/locale";

// types
import {
	DarkModeTypes,
	DarkModeContextTypes,
	ProviderProps,
} from "../types/ContexTypes";

// eslint-disable-next-line react-refresh/only-export-components
export const DarkModeContex = createContext<DarkModeContextTypes>(
	{} as DarkModeContextTypes
);

export const DarkModeInfo = ({ children }: ProviderProps) => {
	const [darkMode, setDarkModeState] = useState<boolean>(false);

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
			text_color: "text-white",
		},
		secondary: {
			main: "bg-stone-800",
			main_contrast: "bg-stone-600",
			color: "white",
			border_color: "hover:border-cyan-600",
			text_color: "text-stone-400",
		},
	};

	const lightTailwind: DarkModeTypes = {
		primary: {
			main: "bg-white",
			color: "black",
			border_color: "hover:border-cyan-600",
			text_color: "text-black",
		},
		secondary: {
			main: "bg-gray-300",
			main_contrast: "bg-gray-200",
			color: "black",
			border_color: "hover:border-cyan-600",
			text_color: "text-stone-600",
		},
	};

	const themeMaterial = createTheme(
		darkMode
			? {
					...darkMaterial,
					palette: { ...darkMaterial.palette, mode: "dark" },
					components: {
						MuiButton: {
							styleOverrides: {
								root: {
									"&.Mui-disabled": {
										background: "#333333",
									},
								},
							},
						},
					},
				}
			: {
					...lightMaterial,
					palette: { ...lightMaterial.palette, mode: "light" },
					components: {
						MuiButton: {
							styleOverrides: {
								root: {
									"&.Mui-disabled": {
										background: "#e0e0e0",
									},
								},
							},
						},
					},
				},
		esES,
		coreEs
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
			localStorage.setItem("darkMode", "false");
		}
	}, []);

	return (
		<DarkModeContex.Provider value={{ darkMode, themeTatailwind, setDarkMode }}>
			<ThemeProvider theme={themeMaterial}>{children}</ThemeProvider>
		</DarkModeContex.Provider>
	);
};
