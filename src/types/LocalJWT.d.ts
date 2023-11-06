import { JwtPayload } from "jwt-decode";

interface LocalJWTUndefined extends JwtPayload {
    token: string | undefined;
    id: string | undefined;
    isAdmin: boolean | undefined;
    fk_store: string | undefined;
    iat: number | undefined;
    exp: number | undefined;
}
interface LocalJWTDefined extends JwtPayload {
    token: string;
    id: string;
    isAdmin: boolean;
    fk_store: string;
    iat: number;
    exp: number;
}
