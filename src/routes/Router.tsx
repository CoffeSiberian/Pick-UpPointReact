import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "../hooks/UserContex";

import Home from "./pages/Home";
import Store from "./pages/Store";
import Header from "../components/Header";
import AdminDash from "./pages/AdminDash";
import ErrorPage from "../components/ErrorPage";

const Router = () => {
    const { UserInfo } = useUser();

    const verifyUser = (): boolean => {
        return UserInfo !== null && UserInfo.isAdmin;
    };

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
                            {verifyUser() ? (
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
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
