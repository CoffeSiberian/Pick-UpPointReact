import { AxiosResponse } from "axios";

interface UserPost extends AxiosResponse {
    data: {
        status: number;
        message: string;
    };
}
