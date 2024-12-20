import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { dataGet, dataPost, dataPut, dataDelete } from "../helpers/dataFetch";

const useFetch = (url: string, method: "GET" | "POST" | "PUT" | "DELETE") => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [succes, setSucces] = useState<boolean>(false);

	const response = async (
		options: AxiosRequestConfig,
		payload?: string | FormData
	): Promise<AxiosResponse | null> => {
		if (method === "GET") {
			return responseGET(options);
		} else if (method === "POST") {
			return responsePOST(options, payload ? payload : "");
		} else if (method === "PUT") {
			return reponsePUT(options, payload ? payload : "");
		}
		return responseDELETE(options);
	};

	const responsePOST = async (
		options: AxiosRequestConfig,
		payload: string | FormData
	): Promise<AxiosResponse | null> => {
		setLoading(true);
		const data = await dataPost(options, payload, url);
		if (data) {
			if (data.status === 200) setSucces(true);
			else setError(true);
		} else {
			setError(true);
		}
		setLoading(false);
		return data;
	};

	const responseGET = async (
		options: AxiosRequestConfig
	): Promise<AxiosResponse | null> => {
		setLoading(true);
		const data = await dataGet(options, url);
		if (data) {
			if (data.status === 200) setSucces(true);
			else setError(true);
		} else {
			setError(true);
		}
		setLoading(false);
		return data;
	};

	const reponsePUT = async (
		options: AxiosRequestConfig,
		payload: string | FormData
	): Promise<AxiosResponse | null> => {
		setLoading(true);
		const data = await dataPut(options, payload, url);
		if (data) {
			if (data.status === 200) setSucces(true);
			else setError(true);
		} else {
			setError(true);
		}
		setLoading(false);
		return data;
	};

	const responseDELETE = async (
		options: AxiosRequestConfig
	): Promise<AxiosResponse | null> => {
		setLoading(true);
		const data = await dataDelete(options, url);
		if (data) {
			if (data.status === 200) setSucces(true);
			else setError(true);
		} else {
			setError(true);
		}
		setLoading(false);
		return data;
	};

	return { loading, error, succes, response, setError, setSucces };
};

export default useFetch;
