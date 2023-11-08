import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/DarkModeContex";
import { useUser } from "../hooks/UserContex";
import { styled } from "@mui/material/styles";
import logo from "../static/img/logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// components
import ModalLogin from "./ModalLogin";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";

import Switch from "@mui/material/Switch";
import MovileHeaderOptions from "./MovileHeaderOptions";

const Header = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const { UserInfo } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openLogin, setopenLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor:
                theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor:
                theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    return (
        <nav
            className={`pb-40 sm:pb-48 md:pb-36 ${
                darkMode ? "bg-neutral-900" : "bg-white"
            }`}
        >
            <ModalLogin
                open={openLogin}
                handleClose={() => setopenLogin(false)}
                openRegister={() => navigate("/register")}
            />
            <AppBar position="fixed">
                <div className="flex absolute justify-center top-3 w-full">
                    <img
                        className="drop-shadow-2xl w-32"
                        src={logo}
                        alt="Los Andes VTC logo"
                    />
                </div>
                <MovileHeaderOptions
                    openDrawer={menuOpen}
                    setOpenDrawer={setMenuOpen}
                />
                <Toolbar disableGutters>
                    <div className="flex md:hidden">
                        <IconButton
                            aria-label="Menu"
                            color="inherit"
                            size="large"
                            onClick={() => setMenuOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                    </div>
                    <div className="md:flex ml-5 hidden justify-start w-full">
                        <div className="flex">
                            <Button
                                startIcon={<HomeRoundedIcon />}
                                color="inherit"
                                onClick={() => navigate("/")}
                            >
                                Inicio
                            </Button>
                            <Divider
                                sx={{ mr: 1 }}
                                orientation="vertical"
                                variant="middle"
                                flexItem
                            />
                        </div>
                    </div>

                    <div className="md:flex hidden justify-end w-full">
                        <Divider
                            sx={{ mr: 1 }}
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                        <div className="flex">
                            {UserInfo !== null && !UserInfo.isAdmin && (
                                <>
                                    <Button
                                        startIcon={<PersonIcon />}
                                        color="inherit"
                                        onClick={() => navigate("/account")}
                                    >
                                        Cuenta
                                    </Button>
                                </>
                            )}

                            {UserInfo === null && (
                                <>
                                    <Button
                                        startIcon={<PersonIcon />}
                                        color="inherit"
                                        onClick={() => setopenLogin(true)}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </>
                            )}

                            {UserInfo !== null && UserInfo.isAdmin && (
                                <>
                                    <Button
                                        startIcon={<PersonIcon />}
                                        color="inherit"
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Dashboard
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex w-full mr-5 justify-end md:w-auto">
                        <MaterialUISwitch
                            checked={darkMode}
                            onChange={(event) =>
                                setDarkMode(event.target.checked)
                            }
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
