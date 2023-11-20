import axios, { AxiosResponse, AxiosRequestConfig, isAxiosError } from "axios";

const dataGet = async (
    options: AxiosRequestConfig | undefined,
    url: string
): Promise<AxiosResponse | null> => {
    try {
        return await axios.get(url, options);
    } catch (e) {
        if (isAxiosError(e)) {
            if (e.response) {
                return e.response;
            }
        }
        return null;
    }
};

const dataPost = async (
    options: AxiosRequestConfig,
    payload: string,
    url: string
): Promise<AxiosResponse | null> => {
    try {
        return await axios.post(url, payload, options);
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                return err.response;
            }
        }
        return null;
    }
};

const dataDelete = async (
    options: AxiosRequestConfig,
    url: string
): Promise<AxiosResponse | null> => {
    try {
        return await axios.delete(url, options);
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                return err.response;
            }
        }
        return null;
    }
};

const dataPut = async (
    options: AxiosRequestConfig,
    payload: string,
    url: string
): Promise<AxiosResponse | null> => {
    try {
        return await axios.put(url, payload, options);
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                return err.response;
            }
        }
        return null;
    }
};

export { dataGet, dataPost, dataPut, dataDelete };
