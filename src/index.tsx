import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkMode } from "./hooks/DarkModeContex";
import { UserInfo } from "./hooks/UserContex";
import { ShopCartInfo } from "./hooks/ShopCartContex";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <UserInfo>
            <DarkMode>
                <ShopCartInfo>
                    <App />
                </ShopCartInfo>
            </DarkMode>
        </UserInfo>
    </React.StrictMode>
);
