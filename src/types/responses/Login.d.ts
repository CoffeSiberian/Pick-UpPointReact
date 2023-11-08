import { AxiosResponse } from "axios";

interface LoginResponse extends AxiosResponse {
    data: {
        jwt: string;
    };
}
