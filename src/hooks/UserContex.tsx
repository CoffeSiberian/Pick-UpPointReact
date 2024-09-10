import { createContext, useState, useEffect, useRef } from "react";
import { dataGet } from "../helpers/dataFetch";
import { API_URL } from "../helpers/configs";
import { getTokenData, getTokenDataGiven } from "../helpers/getLocalJwt";

// types
import { UserContextTypes, ProviderProps } from "../types/ContexTypes";
import { LocalJWTDefined } from "../types/LocalJWT";

export const UserContex = createContext<UserContextTypes>(
	{} as UserContextTypes
);

export const UserInfo = ({ children }: ProviderProps) => {
	const loaded = useRef<boolean>(false);
	const [UserInfo, setUserInfo] = useState<LocalJWTDefined | null>(null);

	const verifyJWT = async (token: string) => {
		const response = await dataGet(
			{ headers: { Authorization: `Bearer ${token}` } },
			`${API_URL}/verifyjwt`
		);

		if (response === null) return false;
		if (response.status === 200) {
			setUserInfo(getTokenData());
		}
	};

	const setLocalJwt = (token: string) => {
		localStorage.setItem("jwt", token);
		setUserInfo(getTokenDataGiven(token));
	};

	const logout = () => {
		localStorage.removeItem("jwt");
		setUserInfo(null);
		window.location.href = "/";
	};

	useEffect(() => {
		if (loaded.current) return;

		const jwt = localStorage.getItem("jwt");
		if (jwt !== null) {
			verifyJWT(jwt);
		}
		loaded.current = true;
	}, []);

	return (
		<UserContex.Provider value={{ UserInfo, setLocalJwt, logout }}>
			{children}
		</UserContex.Provider>
	);
};
