import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContex } from "../hooks/UserContex";

import Layout from "../components/Layout";
import Home from "./pages/Home";
import Store from "./pages/Store";
import ViewProduct from "./pages/ViewProduct";
import RenderQrCode from "./pages/RenderQrCode";
import AdminDash from "./pages/AdminDash";
import ErrorPage from "../components/ErrorPage";

const Router = () => {
	const { UserInfo } = useContext(UserContex);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route
						path="/admin/:page"
						element={
							<>
								{UserInfo !== null && UserInfo.isAdmin ? (
									<AdminDash />
								) : (
									<ErrorPage
										title="Acceso denegado"
										message="No tienes permisos para acceder a esta sección"
										footer="Si crees que esto es un error, contacta con el administrador"
									/>
								)}
							</>
						}
					/>
					<Route path="/product/:newid" element={<ViewProduct />} />
					<Route path="/purchase/qr/:id" element={<RenderQrCode />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
