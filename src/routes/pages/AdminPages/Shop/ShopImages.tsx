import {
	FC,
	useState,
	useCallback,
	useEffect,
	useContext,
	useRef,
} from "react";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import { UserContex } from "../../../../hooks/UserContex";
import useFetch from "../../../../hooks/useFetch";

// MUI
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

// Components
import ShopImagesEdit from "./ShopImagesEdit";

// icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// types
import { Images_Products } from "../../../../types/model";
import { ProductResponse } from "../../../../types/responses/ProductsList";

interface ShopImagesProps {
	productId: string;
}

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const ShopImages: FC<ShopImagesProps> = ({ productId }) => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const [images, setImages] = useState<Images_Products[]>([]);
	const [primaryImage, setPrimaryImage] = useState<
		Images_Products | undefined
	>();

	const { response: responseGetImages } = useFetch(`${API_URL}/product`, "GET");
	const { response: responsePostImage, loading: loadingPostImage } = useFetch(
		`${API_URL}/product/images`,
		"POST"
	);

	const getProductImages = useCallback(async () => {
		const data: ProductResponse | null = await responseGetImages({
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				id: productId,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setImages(data.data.images);
			setPrimaryImage(data.data.primary_image);
		}
	}, [productId, responseGetImages]);

	const postImage = async (file: File) => {
		if (!UserInfo) return;

		const formData = new FormData();
		formData.append("image", file);
		formData.append("fk_product", productId);

		const data = await responsePostImage(
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			formData
		);

		if (data) {
			if (data.status === 200) {
				getProductImages();
			}
		}
	};

	useEffect(() => {
		if (!loaded.current) {
			loaded.current = true;
			getProductImages();
		}
	}, [getProductImages]);

	return (
		<div className="flex flex-col justify-center gap-5">
			<ShopImagesEdit
				productId={productId}
				images={images}
				defaultImage={primaryImage}
				reloadImages={getProductImages}
			/>
			<LoadingButton
				component="label"
				role={undefined}
				variant="contained"
				color="success"
				startIcon={<CloudUploadIcon />}
				loading={loadingPostImage}
			>
				<VisuallyHiddenInput
					type="file"
					accept="image/*"
					onChange={(event) => {
						if (event.target.files) {
							postImage(event.target.files[0]);
						}
					}}
					multiple={false}
				/>
				Subir imagen
			</LoadingButton>
		</div>
	);
};

export default ShopImages;
