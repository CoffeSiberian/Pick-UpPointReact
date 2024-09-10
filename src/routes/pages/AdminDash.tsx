import { useState } from "react";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Summary from "./AdminPages/Summary";
import Users from "./AdminPages/Users/Users";
import Sales from "./AdminPages/Sales/Sales";
import Shop from "./AdminPages/Shop/Shop";
import Categories from "./AdminPages/Categories/Categories";

// icons
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";

const AdminDash = () => {
	const [value, setValue] = useState("1");

	return (
		<div className="flex flex-col justify-center p-2">
			<TabContext value={value}>
				<div className="flex items-center justify-center">
					<TabList
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
						textColor="secondary"
						onChange={(_, value) => setValue(value)}
						aria-label="options-admin"
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
							icon={<CardMembershipIcon />}
							iconPosition="start"
							label="Categorias"
							value="4"
						/>
						<Tab
							icon={<StorefrontIcon />}
							iconPosition="start"
							label="Ventas"
							value="5"
						/>
					</TabList>
				</div>
				<Divider
					className="p-2"
					variant="middle"
					light={false}
					sx={{ borderBottomWidth: 3 }}
				/>
				<div className="flex flex-col justify-center">
					<TabPanel value="1">
						<Summary />
					</TabPanel>
					<TabPanel value="2">
						<Users />
					</TabPanel>
					<TabPanel value="3">
						<Shop />
					</TabPanel>
					<TabPanel value="4">
						<Categories />
					</TabPanel>
					<TabPanel value="5">
						<Sales />
					</TabPanel>
				</div>
			</TabContext>
		</div>
	);
};

export default AdminDash;
