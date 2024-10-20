import { useParams, useNavigate } from "react-router-dom";
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

type AdminDashTabs =
	| "summary"
	| "users"
	| "shop"
	| "categories"
	| "sales"
	| undefined;

const AdminDash = () => {
	const { page } = useParams();
	const navigate = useNavigate();

	const setDashTab = (page: AdminDashTabs) => {
		navigate(`/admin/${page}`);
	};

	return (
		<div className="flex flex-col justify-center p-2">
			<TabContext value={page ? page : "summary"}>
				<div className="flex items-center justify-center">
					<TabList
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
						textColor="secondary"
						onChange={(_, value) => setDashTab(value)}
						aria-label="options-admin"
					>
						<Tab
							icon={<QueryStatsIcon />}
							iconPosition="start"
							label="Resumen"
							value="summary"
						/>
						<Tab
							icon={<PersonIcon />}
							iconPosition="start"
							label="Usuarios"
							value="users"
						/>
						<Tab
							icon={<AddShoppingCartIcon />}
							iconPosition="start"
							label="Tienda"
							value="shop"
						/>
						<Tab
							icon={<CardMembershipIcon />}
							iconPosition="start"
							label="Categorias"
							value="categories"
						/>
						<Tab
							icon={<StorefrontIcon />}
							iconPosition="start"
							label="Ventas"
							value="sales"
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
					<TabPanel value="summary">
						<Summary />
					</TabPanel>
					<TabPanel value="users">
						<Users />
					</TabPanel>
					<TabPanel value="shop">
						<Shop />
					</TabPanel>
					<TabPanel value="categories">
						<Categories />
					</TabPanel>
					<TabPanel value="sales">
						<Sales />
					</TabPanel>
				</div>
			</TabContext>
		</div>
	);
};

export default AdminDash;
