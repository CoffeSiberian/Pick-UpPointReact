import { LocalJWTDefined } from "./LocalJWT";

export interface DarkModeTypes {
    primary: {
        main: string;
        color: string;
        border_color: string;
    };
    secondary: {
        main: string;
        main_contrast: string;
        color: string;
        border_color: string;
    };
}

export interface DarkModeContextTypes {
    darkMode: boolean;
    themeTatailwind: DarkModeTypes;
    setDarkMode: (value: boolean) => void;
}

export interface UserContextTypes {
    UserInfo: LocalJWTDefined | null;
    setLocalJwt: (token: string) => void;
    logout: () => void;
}
