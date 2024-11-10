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
// import { DarkModeContex } from "../hooks/DarkModeContex";
import { UserContex } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";

// Components
import ItemsProductCard from "./ItemsProductCard";

// img
import testImg from "../static/img/test.png";

// types
import {
	ItemsPurchasedListResponse,
	Purchases_Items_Response,
} from "../types/responses/PurchaseList";

interface ModalLoadingProps {
	purchaseId: string | null;
}

const ViewPurchasedProducts: FC<ModalLoadingProps> = ({ purchaseId }) => {
	// const { darkMode } = useContext(DarkModeContex);
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const [products, setProducts] = useState<Purchases_Items_Response[] | null>();

	const { response } = useFetch(
		`${API_URL}/purchase/items?id=${purchaseId}`,
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
		<div>
			{products ? (
				products.map((product) => (
					<ItemsProductCard
						key={product.product.id}
						id={product.product.id}
						name={product.product.name}
						img={testImg}
						category="CATEGORIA"
						description={product.product.description}
						price={product.price}
						quantity={product.quantity}
					/>
				))
			) : (
				<></>
			)}
		</div>
	);
};

export default ViewPurchasedProducts;
