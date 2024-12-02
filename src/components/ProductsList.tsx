import { useState, useEffect, useCallback, useRef } from "react";
import { API_URL, FK_STORE } from "../helpers/configs";

// Context and hooks
import useFetch from "../hooks/useFetch";

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
		`${API_URL}/products?store=${FK_STORE}&limit_start=0&limit_end=15`,
		"GET"
	);

	const [products, setProducts] = useState<ProductResponseObject[]>([]);

	const getData = useCallback(async () => {
		const data: ProductsListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setProducts(data.data.products);
		}
	}, [response]);

	useEffect(() => {
		if (!loaded.current) {
			getData();
			loaded.current = true;
		}
	}, [loaded, getData]);

	const renderProducts = (): JSX.Element => {
		return (
			<div className="my-5 grid grid-flow-row grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{products.map((product) => {
					const description = product.description.substring(0, 100);
					const descriptionExtra =
						description.length === 100 ? description + "..." : description;

					return (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							category={product.category.name}
							description={descriptionExtra}
							price={product.price}
							img={product.primary_image}
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
