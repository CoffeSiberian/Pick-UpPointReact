import { useState, useContext, Fragment } from "react";
import classNames from "classnames";

// Context and hooks
import { useNavigate } from "react-router-dom";
import { DarkModeContex } from "../hooks/DarkModeContex";
import { UserContex } from "../hooks/UserContex";

// MUI
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import MovileHeaderOptions from "./MovileHeaderOptions";

// components
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import LoginOptions from "./LoginOptions";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";

// images
import logo from "../static/img/logo.webp";

const Header = () => {
	const { darkMode, setDarkMode } = useContext(DarkModeContex);
	const { UserInfo } = useContext(UserContex);

	const [menuOpen, setMenuOpen] = useState(false);
	const [openLogin, setopenLogin] = useState<boolean>(false);
	const [OpenRegister, setOpenRegister] = useState<boolean>(false);

	const navigate = useNavigate();

	const menuOptions: HeaderOptions = {
		store: [
			{
				name: "Inicio",
				path: "/",
				icon: <HomeRoundedIcon />,
			},
			{
				name: "Tienda",
				path: "/store",
				icon: <StoreIcon />,
			},
		],
	};

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
			backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
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
			backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
			borderRadius: 20 / 2,
		},
	}));

	return (
		<nav
			className={classNames(
				"pb-16 md:pb-20",
				darkMode ? "bg-neutral-900" : "bg-white"
			)}
		>
			<ModalLogin
				open={openLogin}
				openLogin={() => setopenLogin(false)}
				openRegister={setOpenRegister}
			/>
			<ModalRegister
				open={OpenRegister}
				handleClose={() => setOpenRegister(false)}
				openLogin={setopenLogin}
			/>
			<AppBar position="fixed">
				<MovileHeaderOptions
					openDrawer={menuOpen}
					store={menuOptions}
					setOpenDrawer={setMenuOpen}
					setOpenLogin={setopenLogin}
				/>
				<Toolbar className="flex w-full justify-between" disableGutters>
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
					<div className="ml-5 hidden md:flex">
						{menuOptions.store.map((item, index) => (
							<Fragment key={`${index}fragment`}>
								<Button
									key={`${index}item`}
									startIcon={item.icon}
									color="inherit"
									onClick={() => navigate(item.path)}
								>
									{item.name}
								</Button>
								<Divider
									key={`${index}divider`}
									sx={{ mr: 1 }}
									orientation="vertical"
									variant="middle"
									flexItem
								/>
							</Fragment>
						))}
					</div>
					<div className="flex p-2">
						<img
							className="w-12 rounded-lg shadow-lg md:w-16"
							src={logo}
							alt="Store logo"
						/>
					</div>
					<div className="flex">
						<Divider
							sx={{ mr: 1 }}
							orientation="vertical"
							variant="middle"
							flexItem
						/>
						<div className="hidden md:flex">
							{UserInfo && (
								<LoginOptions
									openDrawer={menuOpen}
									setOpenDrawer={setMenuOpen}
								/>
							)}

							{UserInfo === null && (
								<Button
									startIcon={<PersonIcon />}
									color="inherit"
									onClick={() => setopenLogin(true)}
								>
									Iniciar sesión
								</Button>
							)}
						</div>
						<div className="flex">
							<MaterialUISwitch
								checked={darkMode}
								onChange={(event) => setDarkMode(event.target.checked)}
							/>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</nav>
	);
};

export default Header;
