import { AxiosResponse } from "axios";

interface RegisterResponse extends AxiosResponse {
    data: {
        status: number;
        message: string;
    };
}
