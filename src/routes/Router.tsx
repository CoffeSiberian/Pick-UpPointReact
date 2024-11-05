import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ViewProduct from "./pages/ViewProduct";
import RenderQrCode from "./pages/RenderQrCode";
import AdminDash from "./pages/AdminDash";
import AdminRouteValidation from "../components/AdminRouteValidation";
import ViewUser from "./pages/AdminPages/Users/ViewUser";

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
						path="/admin"
						element={<AdminRouteValidation element={AdminDash} />}
					/>
					<Route path="/product/:newid" element={<ViewProduct />} />
					<Route path="/purchase/qr/:id" element={<RenderQrCode />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
