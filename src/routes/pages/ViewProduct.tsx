import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../helpers/configs";

// Context and hooks
import useFetch from "../../hooks/useFetch";

// MUI
import { Portal } from "@mui/base/Portal";

// components
import ModalLoading from "../../components/ModalLoading";
import ErrorPage from "../../components/ErrorPage";
import ShopCart from "../../components/ShopCart";
import ProductImagesView from "../../components/ProductImagesView";
import ProductInfoView from "../../components/ProductInfoView";

// types
import { ProductResponseObject } from "../../types/responses/ProductsList";

const ViewProduct = () => {
	const { newid } = useParams();

	const loaded = useRef(false);

	const { response, loading } = useFetch(
		`${API_URL}/product?id=${newid}`,
		"GET"
	);

	const [Product, setProduct] = useState<ProductResponseObject | undefined>();

	const getData = useCallback(async () => {
		const fetchResponse = await response({
			headers: { "Content-Type": "application/json" },
		});

		if (fetchResponse === null) return;

		if (fetchResponse.status === 200) {
			setProduct(fetchResponse.data);
		}
	}, [response]);

	useEffect(() => {
		if (!loaded.current) {
			getData();
			loaded.current = true;
		}
	}, [newid, getData]);

	return (
		<>
			<Portal>
				<ModalLoading open={loading} />
				<ShopCart />
			</Portal>
			<div className="my-5 flex w-full justify-center">
				{Product ? (
					<>
						<ProductImagesView
							primaryImage={Product.primary_image}
							images={Product.images}
						/>
						<ProductInfoView product={Product} />
					</>
				) : (
					<ErrorPage
						title="404"
						message="Producto no encontrado"
						footer="El producto que buscas no existe o fue eliminado"
					/>
				)}
			</div>
		</>
	);
};

export default ViewProduct;
