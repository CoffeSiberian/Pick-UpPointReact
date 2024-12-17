import {
	FC,
	useCallback,
	useContext,
	useEffect,
	useState,
	useRef,
} from "react";
import { API_URL } from "../helpers/configs";

// Context and hooks
import { UserContex } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";

// MUI
import CircularProgress from "@mui/material/CircularProgress";

// Components
import ItemsProductCard from "./ItemsProductCard";
import ErrorPage from "./ErrorPage";

// types
import {
	ItemsPurchasedListResponse,
	Purchases_Items_Response,
} from "../types/responses/PurchaseList";

interface ModalLoadingProps {
	purchaseId: string | null;
}

const ViewPurchasedProductsProfile: FC<ModalLoadingProps> = ({
	purchaseId,
}) => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const [products, setProducts] = useState<Purchases_Items_Response[] | null>();

	const { response, loading, error } = useFetch(
		`${API_URL}/purchase/profile/items?id=${purchaseId}`,
		"GET"
	);

	const getProducts = useCallback(async () => {
		if (!UserInfo) return;

		const data: ItemsPurchasedListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setProducts(data.data.itemsPurchased);
		}
	}, [UserInfo, response]);

	useEffect(() => {
		if (purchaseId && !loaded.current) {
			getProducts();
			loaded.current = true;
		}

		if (!purchaseId && loaded.current) {
			setProducts(null);
			loaded.current = false;
		}
	}, [getProducts, purchaseId]);

	return (
		<>
			{products &&
				products.map((product) => (
					<ItemsProductCard
						key={product.product.id}
						id={product.product.id}
						name={product.product.name}
						img={product.product.primary_image}
						category={product.product.category.name}
						price={product.price}
						quantity={product.quantity}
					/>
				))}
			{loading && (
				<div className="flex justify-center">
					<CircularProgress color="info" />
				</div>
			)}
			{error && (
				<div>
					<ErrorPage
						title="Error"
						message="Error al cargar los productos"
						footer="Intenta nuevamente"
					/>
				</div>
			)}
		</>
	);
};

export default ViewPurchasedProductsProfile;
