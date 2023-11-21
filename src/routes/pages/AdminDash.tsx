import { useState } from "react";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Summary from "./AdminPages/Summary";
import Users from "./AdminPages/Users/Users";
import Shop from "./AdminPages/Shop";
import Sales from "./AdminPages/Sales";

// icons
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";

const AdminDash = () => {
    const [value, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col p-5 mr-5 ml-5 justify-center">
            <TabContext value={value}>
                <div className="flex justify-center items-center">
                    <TabList
                        textColor="secondary"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab
                            icon={<QueryStatsIcon />}
                            iconPosition="start"
                            label="Resumen"
                            value="1"
                        />
                        <Tab
                            icon={<PersonIcon />}
                            iconPosition="start"
                            label="Usuarios"
                            value="2"
                        />
                        <Tab
                            icon={<AddShoppingCartIcon />}
                            iconPosition="start"
                            label="Tienda"
                            value="3"
                        />
                        <Tab
                            icon={<StorefrontIcon />}
                            iconPosition="start"
                            label="Ventas"
                            value="4"
                        />
                    </TabList>
                </div>
                <Divider
                    className="p-2"
                    variant="middle"
                    light={false}
                    sx={{ borderBottomWidth: 3 }}
                />
                <div className="flex justify-center">
                    <TabPanel value="1">
                        <Summary />
                    </TabPanel>
                    <TabPanel className="flex" value="2">
                        <Users />
                    </TabPanel>
                    <TabPanel value="3">
                        <Shop />
                    </TabPanel>
                    <TabPanel value="4">
                        <Sales />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    );
};

export default AdminDash;
