import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "../components/Header";

const Router = () => {
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
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
