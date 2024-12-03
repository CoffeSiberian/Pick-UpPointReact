import { FC, useState } from "react";
import { STATIC_URL } from "../helpers/configs";

import "swiper/css";
import "swiper/css/pagination";

// components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// types
import { Images_Products } from "../types/model";

interface ProductImageViewProps {
	primaryImage?: Images_Products;
	images: Images_Products[];
}

const ProductImagesView: FC<ProductImageViewProps> = ({
	primaryImage,
	images,
}) => {
	const [selectedImage, setSelectedImage] = useState<
		Images_Products | undefined
	>(primaryImage);

	return (
		<div className="flex w-full max-w-xl flex-col gap-5 p-5">
			<div className="flex justify-center">
				<img
					className="max-h-72 rounded-xl object-contain drop-shadow-lg"
					src={selectedImage ? `${STATIC_URL}/${selectedImage.file_name}` : ""}
					alt={selectedImage?.file_name}
				/>
			</div>
			<div>
				<Swiper
					slidesPerView={3}
					centeredSlides={false}
					spaceBetween={10}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					freeMode={true}
					modules={[FreeMode]}
				>
					{images.map((item) => (
						<SwiperSlide key={item.id}>
							<div className="flex justify-center">
								<img
									className="max-h-36 rounded-xl object-contain"
									onClick={() => setSelectedImage(item)}
									style={{ cursor: "pointer" }}
									src={item ? `${STATIC_URL}/${item.file_name}` : ""}
									alt={item.file_name}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default ProductImagesView;
