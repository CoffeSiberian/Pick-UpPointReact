import { jwtDecode } from "jwt-decode";
import { LocalJWTDefined, LocalJWTUndefined } from "../types/LocalJWT";

export const getTokenData = (): LocalJWTDefined | null => {
    try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("No token found");

        const jwt_obj: LocalJWTUndefined = jwtDecode(token);
        const id = jwt_obj.id;
        const isAdmin = jwt_obj.isAdmin;
        const fk_store = jwt_obj.fk_store;
        const iat = jwt_obj.iat;
        const exp = jwt_obj.exp;

        if (!id || isAdmin === undefined || !fk_store || !iat || !exp) {
            throw new Error("Invalid token");
        }

        return {
            token,
            id,
            isAdmin,
            fk_store,
            iat,
            exp,
        };
    } catch {
        localStorage.removeItem("jwt");
        return null;
    }
};

export const getTokenDataGiven = (token: string): LocalJWTDefined | null => {
    try {
        if (!token) throw new Error("No token found");

        const jwt_obj: LocalJWTUndefined = jwtDecode(token);
        const id = jwt_obj.id;
        const isAdmin = jwt_obj.isAdmin;
        const fk_store = jwt_obj.fk_store;
        const iat = jwt_obj.iat;
        const exp = jwt_obj.exp;

        if (!id || isAdmin === undefined || !fk_store || !iat || !exp) {
            throw new Error("Invalid token");
        }

        return {
            token,
            id,
            isAdmin,
            fk_store,
            iat,
            exp,
        };
    } catch (e) {
        return null;
    }
};
