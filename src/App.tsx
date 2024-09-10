import { useContext } from "react";
import { DarkModeContex } from "./hooks/DarkModeContex";
import classNames from "classnames";
import Router from "./routes/Router";
import Footer from "./components/Footer";

const App = () => {
	const { themeTatailwind } = useContext(DarkModeContex);

	return (
		<div
			className={classNames(
				"flex min-h-screen flex-col",
				themeTatailwind.primary.main
			)}
		>
			<Router />
			<Footer />
		</div>
	);
};

export default App;
