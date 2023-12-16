import { useState, useEffect, useRef } from "react";
import { useShopCart } from "../../hooks/ShopCartContex";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../hooks/DarkModeContex";
import { API_URL } from "../../helpers/configs";
import { ProductResponseObject } from "../../types/responses/ProductsList";
import useFetch from "../../hooks/useFetch";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ModalLoading from "../../components/ModalLoading";
import ErrorPage from "../../components/ErrorPage";
import ShopCart from "../../components/ShopCart";

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import testImg from "../../static/img/test.png";

const ViewProduct = () => {
    const { newid } = useParams();
    const { shopCart, addProduct } = useShopCart();
    const { themeTatailwind } = useDarkMode();

    const oldid = useRef(newid);
    const loaded = useRef(false);

    const { response, error, loading } = useFetch(
        `${API_URL}/product?id=${newid}`,
        "GET"
    );

    const [Product, setProduct] = useState<ProductResponseObject | undefined>();
    const [ImageIndex, setImageIndex] = useState<number>(0);

    const testImgs = [
        {
            id: 1,
            name: "test",
            src: testImg,
        },
        { id: 2, name: "test", src: testImg },
        { id: 3, name: "test", src: testImg },
    ];

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

    const renderImages = (): JSX.Element => {
        if (testImgs.length === 0) return <></>;

        return (
            <div className="flex flex-row gap-3 overflow-hidden">
                {testImgs.map((img) => (
                    <div key={img.id} className="flex flex-col">
                        <img src={img.src} alt={img.name} />
                    </div>
                ))}
            </div>
        );
    };

    const renderBigImage = (): JSX.Element => {
        if (testImgs.length === 0) return <></>;

        return (
            <div className="flex flex-col">
                <img src={testImgs[0].src} alt="test" />
            </div>
        );
    };

    const renderProduct = (): JSX.Element => {
        if (Product === undefined) return <></>;

        return (
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl p-2 md:p-10">
                    <div className="flex flex-col max-w-xl gap-5">
                        <div>{renderBigImage()}</div>
                        <div>{renderImages()}</div>
                    </div>
                    <div className="flex flex-col p-5 place-content-between">
                        <div className="flex flex-col gap-3">
                            <Typography
                                color={themeTatailwind.primary.color}
                                variant="h2"
                            >
                                {Product.name}
                            </Typography>
                            <Typography
                                color={themeTatailwind.primary.color}
                                variant="h6"
                            >
                                {Product.price.toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
                            </Typography>
                            <Typography
                                color={themeTatailwind.primary.color}
                                variant="body1"
                            >
                                Stock: {Product.stock.quantity}
                            </Typography>
                        </div>
                        <div className="flex pb-3 pt-3">
                            <Typography
                                color={themeTatailwind.primary.color}
                                variant="body1"
                            >
                                {Product.description}
                            </Typography>
                        </div>
                        <Button
                            startIcon={<ShoppingCartIcon />}
                            color="success"
                            variant="contained"
                            onClick={() => {
                                addProduct({
                                    id: Product.id,
                                    name: Product.name,
                                    price: Product.price,
                                    quantity: 1,
                                });
                            }}
                        >
                            Agregar al Carrito
                        </Button>
                    </div>
                </div>
            </div>
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
        <>
            <ModalLoading open={loading} />
            {error ? checkError() : null}
            {Product || !error ? renderProduct() : null}
            <ShopCart />
        </>
    );
};

export default ViewProduct;
