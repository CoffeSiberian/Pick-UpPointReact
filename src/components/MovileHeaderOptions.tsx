import { FC, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { UserContex } from "../hooks/UserContex";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import LoginOptions from "./LoginOptions";

// icons
import PersonIcon from "@mui/icons-material/Person";

interface MovileHeaderOptionsProps {
	openDrawer: boolean;
	store: HeaderOptions;
	setOpenDrawer: (open: boolean) => void;
	setOpenLogin: (open: boolean) => void;
}

const MovileHeaderOptions: FC<MovileHeaderOptionsProps> = ({
	openDrawer,
	store,
	setOpenDrawer,
	setOpenLogin,
}) => {
	const navigate = useNavigate();
	const { UserInfo } = useContext(UserContex);

	return (
		<Drawer
			className="flex md:hidden"
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
		>
			<List>
				{store.store.map((item, index) => (
					<Fragment key={`${index}fragment`}>
						<ListItem disablePadding>
							<ListItemButton
								key={`${index}item`}
								onClick={() => {
									navigate(item.path);
									setOpenDrawer(false);
								}}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItemButton>
						</ListItem>
						<Divider />
					</Fragment>
				))}
				<Fragment key="loginfragment">
					<ListItem disablePadding>
						<div className="mt-2 flex w-full justify-center">
							{UserInfo && <LoginOptions />}
							{UserInfo === null && (
								<Button
									startIcon={<PersonIcon />}
									color="inherit"
									onClick={() => setOpenLogin(true)}
								>
									Iniciar sesión
								</Button>
							)}
						</div>
					</ListItem>
				</Fragment>
			</List>
		</Drawer>
	);
};

export default MovileHeaderOptions;
