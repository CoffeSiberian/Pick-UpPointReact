import { createContext, useState, useContext, useEffect, useRef } from "react";
import { dataGet } from "../helpers/dataFetch";
import { API_URL } from "../helpers/configs";
import { UserContextTypes } from "../types/ContexTypes";
import getTokenData from "../helpers/getLocalJwt";
import { LocalJWTDefined } from "../types/LocalJWT";

const UserContex = createContext<UserContextTypes>({} as UserContextTypes);

export const useUser = (): UserContextTypes => {
    return useContext(UserContex);
};

export const UserInfo = ({ children }: any) => {
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

    useEffect(() => {
        if (loaded.current) return;

        const LocalInfo = getTokenData();
        if (LocalInfo) {
            verifyJWT(LocalInfo.token);
        }
        loaded.current = true;
    }, []);

    return (
        <UserContex.Provider value={{ UserInfo }}>
            {children}
        </UserContex.Provider>
    );
};
