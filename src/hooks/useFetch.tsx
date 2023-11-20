import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { dataGet, dataPost, dataDelete } from "../helpers/dataFetch";

const useFetch = (url: string, method: "GET" | "POST" | "DELETE") => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [succes, setSucces] = useState<boolean>(false);

    const response = async (
        options: AxiosRequestConfig,
        payload?: string
    ): Promise<AxiosResponse | null> => {
        if (method === "GET") {
            return responseGET(options);
        } else if (method === "POST") {
            return responsePOST(options, payload ? payload : "");
        } else {
            return responseDELETE(options);
        }
    };

    const responsePOST = async (
        options: AxiosRequestConfig,
        payload: string
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
