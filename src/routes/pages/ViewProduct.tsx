import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_URL } from "../../helpers/configs";
import { ProductResponseObject } from "../../types/responses/ProductsList";
import ModalLoading from "../../components/ModalLoading";
import ErrorPage from "../../components/ErrorPage";

const ViewProduct = () => {
    const { newid } = useParams();

    const oldid = useRef(newid);
    const loaded = useRef(false);

    const navigate = useNavigate();

    const { response, error, loading } = useFetch(
        `${API_URL}/product?id=${newid}`,
        "GET"
    );

    const [Product, setProduct] = useState<ProductResponseObject | undefined>();

    const getData = async () => {
        const fetchResponse = await response({
            headers: { "Content-Type": "application/json" },
        });

        if (fetchResponse === null) return;

        if (fetchResponse.status === 200) {
            setProduct(fetchResponse.data);
        }
    };

    const idChange = () => {
        if (oldid.current !== newid) {
            getData();
            oldid.current = newid;
        }
    };

    const checkError = () => {
        return (
            <ErrorPage
                title="404"
                message="Producto no encontrado"
                footer="El producto que buscas no existe o fue eliminado"
            />
        );
    };

    useEffect(() => {
        idChange();
        if (!loaded.current) {
            getData();
            loaded.current = true;
        } // eslint-disable-next-line
    }, [newid]);

    return (
        <div>
            <ModalLoading open={loading} />
            {error ? checkError() : null}
            <h1>View Product</h1>
        </div>
    );
};

export default ViewProduct;
