import { FC } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

// icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

interface MovileHeaderOptionsProps {
    openDrawer: boolean;
    setOpenDrawer: (open: boolean) => void;
}

const MovileHeaderOptions: FC<MovileHeaderOptionsProps> = ({
    openDrawer,
    setOpenDrawer,
}) => {
    const navigate = useNavigate();

    return (
        <Drawer
            className="flex md:hidden"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
        >
            <List>
                <div>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/");
                                setOpenDrawer(false);
                            }}
                        >
                            <ListItemIcon>{<HomeRoundedIcon />}</ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </div>
            </List>
        </Drawer>
    );
};

export default MovileHeaderOptions;
