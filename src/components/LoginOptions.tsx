import { useState, useContext } from "react";
import { UserContex } from "../hooks/UserContex";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

const LoginOptions = () => {
	const [ProfileOpen, setProfileOpen] = useState<null | HTMLElement>(null);

	const { UserInfo, logout } = useContext(UserContex);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		setProfileOpen(null);
	};

	const handleAdminPanel = () => {
		navigate("/admin/summary");
		setProfileOpen(null);
	};

	return (
		<div>
			<Tooltip title="Menu de opciones" arrow>
				<Button
					onClick={(e) => setProfileOpen(e.currentTarget)}
					color="inherit"
					startIcon={<AccountCircleIcon />}
				>
					Perfil
				</Button>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				anchorEl={ProfileOpen}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(ProfileOpen)}
				onClose={() => setProfileOpen(null)}
			>
				{UserInfo !== null && UserInfo.isAdmin && (
					<MenuItem onClick={handleAdminPanel} className="gap-1">
						<AdminPanelSettingsIcon />
						<Typography textAlign="center">Panel de control</Typography>
					</MenuItem>
				)}
				<MenuItem onClick={handleLogout} className="gap-1">
					<LogoutIcon />
					<Typography textAlign="center">Cerrar Sesion</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default LoginOptions;
