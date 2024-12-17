import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Layout from "../components/Layout";
import AdminRouteValidation from "../components/AdminRouteValidation";
import UserRouteValidation from "../components/UserRouteValidation";

// Pages
import Home from "./pages/Home";
import Profiles from "./pages/Profiles/Profiles";
import Store from "./pages/Store";
import ViewProduct from "./pages/ViewProduct";
import RenderQrCode from "./pages/RenderQrCode";
import AdminDash from "./pages/AdminDash";
import ViewUser from "./pages/AdminPages/Users/ViewUser";
import ViewSale from "./pages/AdminPages/Sales/ViewSale";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route
						path="/admin/:page"
						element={<AdminRouteValidation element={AdminDash} />}
					/>
					<Route
						path="/admin/users/:id"
						element={<AdminRouteValidation element={ViewUser} />}
					/>
					<Route
						path="/admin/sales/verify"
						element={<AdminRouteValidation element={ViewSale} />}
					/>
					<Route
						path="/admin"
						element={<AdminRouteValidation element={AdminDash} />}
					/>
					<Route
						path="/profile"
						element={<UserRouteValidation element={Profiles} />}
					/>
					<Route path="/product/:newid" element={<ViewProduct />} />
					<Route path="/purchase/qr/:id" element={<RenderQrCode />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
