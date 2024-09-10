import { AxiosResponse } from "axios";

interface StandarResponse extends AxiosResponse {
	data: {
		status: number;
		message: string;
	};
}
