import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "../hooks/UserContex";

import Home from "./pages/Home";
import Store from "./pages/Store";
import ViewProduct from "./pages/ViewProduct";
import RenderQrCode from "./pages/RenderQrCode";
import Header from "../components/Header";
import AdminDash from "./pages/AdminDash";
import ErrorPage from "../components/ErrorPage";

const Router = () => {
    const { UserInfo } = useUser();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Home />
                        </>
                    }
                />
                <Route
                    path="/store"
                    element={
                        <>
                            <Header />
                            <Store />
                        </>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <>
                            <Header />
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
                <Route
                    path="/product/:newid"
                    element={
                        <>
                            <Header />
                            <ViewProduct />
                        </>
                    }
                />
                <Route
                    path="/purchase/qr/:id"
                    element={
                        <>
                            <Header />
                            <RenderQrCode />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
