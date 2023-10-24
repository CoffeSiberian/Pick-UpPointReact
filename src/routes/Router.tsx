import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewTicket from "./pages/ViewTicket";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ViewTicket />
                        </>
                    }
                />
                <Route
                    path="/:id"
                    element={
                        <>
                            <ViewTicket />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
