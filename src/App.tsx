import Router from "./routes/Router";
import Footer from "./components/Footer";
import { useDarkMode } from "./hooks/DarkModeContex";

const App = () => {
    const { themeTatailwind } = useDarkMode();

    return (
        <div
            className={`flex flex-col min-h-screen ${themeTatailwind.primary.main}`}
        >
            <Router />
            <Footer />
        </div>
    );
};

export default App;
