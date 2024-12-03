import { FC, useContext } from "react";
import classNames from "classnames";
import { API_URL, STATIC_URL } from "../../../../helpers/configs";

// Context and hooks
import { DarkModeContex } from "../../../../hooks/DarkModeContex";
import { UserContex } from "../../../../hooks/UserContex";
import useFetch from "../../../../hooks/useFetch";

// MUI
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// types
import { Images_Products } from "../../../../types/model";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ShopImageEditsProps {
	productId: string;
	images: Images_Products[];
	defaultImage?: Images_Products;
	reloadImages: () => void;
}

const ShopImagesEdit: FC<ShopImageEditsProps> = ({
	productId,
	images,
	defaultImage,
	reloadImages,
}) => {
	const { darkMode } = useContext(DarkModeContex);
	const { UserInfo } = useContext(UserContex);
	const { response: responseDelete } = useFetch(
		`${API_URL}/product/image`,
		"DELETE"
	);
	const { response: responsePutDefault } = useFetch(
		`${API_URL}/product/primary_image`,
		"PUT"
	);

	const deleteImage = async (id: string) => {
		if (!UserInfo) return;

		const data = await responseDelete({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
			params: {
				id,
				fk_product: productId,
			},
		});

		if (data) {
			if (data.status === 200) {
				reloadImages();
			}
		}
	};

	const setDefaultImage = async (id: string) => {
		if (!UserInfo) return;

		const payload = {
			id: productId,
			fk_image: id,
		};

		const data = await responsePutDefault(
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
			},
			JSON.stringify(payload)
		);

		if (data) {
			if (data.status === 200) {
				reloadImages();
			}
		}
	};

	return (
		<ImageList variant="masonry" cols={2} gap={10}>
			{images.map((item) => (
				<ImageListItem key={item.id}>
					<div className="relative inline-block">
						<div className="absolute right-2 top-2">
							<Button
								variant="contained"
								size="small"
								aria-label="delete"
								color="error"
								onClick={() => deleteImage(item.id)}
							>
								<DeleteIcon />
							</Button>
						</div>
						<div className="absolute left-2 top-2">
							<Button
								variant="contained"
								size="small"
								aria-label="default-image"
								color={
									defaultImage
										? defaultImage.id === item.id
											? "success"
											: "info"
										: "info"
								}
								onClick={() => setDefaultImage(item.id)}
							>
								<CheckCircleIcon />
							</Button>
						</div>
						<img
							className={classNames(
								"max-h-72 rounded-lg object-contain",
								defaultImage
									? defaultImage.id === item.id
										? darkMode
											? "border-4 border-green-500"
											: "border-4 border-green-700"
										: ""
									: ""
							)}
							src={`${STATIC_URL}/${item.file_name}`}
							alt={item.file_name}
							loading="lazy"
						/>
					</div>
				</ImageListItem>
			))}
		</ImageList>
	);
};

export default ShopImagesEdit;
