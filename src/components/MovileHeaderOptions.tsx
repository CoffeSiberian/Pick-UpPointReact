import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";

interface MovileHeaderOptionsProps {
    openDrawer: boolean;
    store: HeaderOptions;
    setOpenDrawer: (open: boolean) => void;
}

const MovileHeaderOptions: FC<MovileHeaderOptionsProps> = ({
    openDrawer,
    store,
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
            </List>
        </Drawer>
    );
};

export default MovileHeaderOptions;
