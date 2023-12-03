import { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { API_URL, FK_STORE } from "../helpers/configs";

// components
import ModalLoading from "./ModalLoading";
import ProductCard from "./ProductCard";
import ErrorPage from "./ErrorPage";

// types
import {
    ProductsListResponse,
    ProductResponseObject,
} from "../types/responses/ProductsList";

const ProductsList = () => {
    const loaded = useRef(false);
    const { response, loading, error } = useFetch(
        `${API_URL}/products?store=${FK_STORE}&limit_start=0&limit_end=5`,
        "GET"
    );

    const [products, setProducts] = useState<ProductResponseObject[]>([]);

    const getData = async () => {
        const data: ProductsListResponse | null = await response({
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!data) return;
        if (data.status === 200) {
            setProducts(data.data);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getData();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderProducts = (): JSX.Element => {
        return (
            <div className="flex flex-wrap justify-center items-center">
                {products.map((product) => {
                    const description = product.description.substring(0, 100);
                    const descriptionExtra =
                        description.length === 100
                            ? description + "..."
                            : description;

                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            category={product.category.name}
                            description={descriptionExtra}
                            price={product.price}
                            img={"https://i.imgur.com/pbABSmI.png"}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            <ModalLoading open={loading} />
            {error && (
                <ErrorPage
                    title="Error"
                    message="No se pudo cargar los productos"
                    footer="Por favor, recargue la página"
                />
            )}
            {!error && !loading && renderProducts()}
        </div>
    );
};

export default ProductsList;
