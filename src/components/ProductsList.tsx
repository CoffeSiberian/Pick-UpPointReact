import { useState, useEffect, useCallback, useRef } from "react";
import { API_URL, FK_STORE } from "../helpers/configs";

// MUI
import Pagination from "@mui/material/Pagination";

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
	const [pagination, setPagination] = useState({
		page: 0,
		pageSize: 8,
		total_products: 0,
	});

	const { response, loading, error } = useFetch(`${API_URL}/products`, "GET");

	const [products, setProducts] = useState<ProductResponseObject[]>([]);

	const getData = useCallback(
		async (page: number, pageSize: number) => {
			const data: ProductsListResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					store: FK_STORE,
					limit_start: page * pageSize,
					limit_end: pageSize,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setProducts(data.data.products);
				setPagination({
					page: page,
					pageSize: pageSize,
					total_products: data.data.total_products,
				});
			}
		},
		[response]
	);

	const onSetPage = (page: number, pageSize: number) => {
		if (page === pagination.page) return;

		getData(page, pageSize);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		if (!loaded.current) {
			getData(pagination.page, pagination.pageSize);
			loaded.current = true;
		}
	}, [loaded, getData, pagination.page, pagination.pageSize]);

	return (
		<div className="p-3 md:p-5">
			<ModalLoading open={loading} />
			{error && (
				<ErrorPage
					title="Error"
					message="No se pudo cargar los productos"
					footer="Por favor, recargue la página"
				/>
			)}
			{!error && !loading && (
				<>
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
					<div className="flex justify-center">
						<Pagination
							count={Math.ceil(pagination.total_products / pagination.pageSize)}
							color="secondary"
							page={pagination.page + 1}
							onChange={(_e, page) => {
								onSetPage(page - 1, pagination.pageSize);
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductsList;
