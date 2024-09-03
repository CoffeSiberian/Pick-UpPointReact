import { useDarkMode } from "./hooks/DarkModeContex";
import classNames from "classnames";
import Router from "./routes/Router";
import Footer from "./components/Footer";

const App = () => {
    const { themeTatailwind } = useDarkMode();

    return (
        <div
            className={classNames(
                "flex flex-col min-h-screen",
                themeTatailwind.primary.main
            )}
        >
            <Router />
            <Footer />
        </div>
    );
};

export default App;
