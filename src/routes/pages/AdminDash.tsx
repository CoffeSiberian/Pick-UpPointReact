import { useParams, useNavigate } from "react-router-dom";

// mui
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Pages
import Summary from "./AdminPages/Summary/Summary";
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
		<div className="flex flex-col justify-center">
			<div className="mt-2 flex items-center justify-center">
				<Tabs
					value={page}
					onChange={(_, value) => setDashTab(value)}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					textColor="secondary"
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
				</Tabs>
			</div>
			<Divider className="p-2" variant="middle" />
			<div className="flex flex-row justify-center py-3">
				{page === "summary" && <Summary />}
				{page === "users" && <Users />}
				{page === "shop" && <Shop />}
				{page === "categories" && <Categories />}
				{page === "sales" && <Sales />}
			</div>
		</div>
	);
};

export default AdminDash;
