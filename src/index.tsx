import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// components
import App from "./App";

// hooks
import { DarkMode } from "./hooks/DarkModeContex";
import { UserInfo } from "./hooks/UserContex";
import { ShopCartInfo } from "./hooks/ShopCartContex";

// styles
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UserInfo>
            <DarkMode>
                <ShopCartInfo>
                    <App />
                </ShopCartInfo>
            </DarkMode>
        </UserInfo>
    </StrictMode>
);
