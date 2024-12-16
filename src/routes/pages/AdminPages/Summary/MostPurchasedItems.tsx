import {
	FC,
	useState,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import classNames from "classnames";
import { API_URL, STATIC_URL } from "../../../../helpers/configs";
import dayjs from "dayjs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";
import { DarkModeContex } from "../../../../hooks/DarkModeContex";

// MUI
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

// icons
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// types
import {
	MostPurchasedItemsResponse,
	MostPurchasedItemsObject,
	PurchaseTotalObject,
} from "../../../../types/responses/Purchase";

interface DateRange {
	date_start: dayjs.Dayjs | null;
	date_end: dayjs.Dayjs | null;
	purchases: PurchaseTotalObject[];
}

const MostPurchasedItems: FC<DateRange> = ({
	date_start,
	date_end,
	purchases,
}) => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);
	const { darkMode } = useContext(DarkModeContex);

	const { response } = useFetch(`${API_URL}/purchases/most`, "GET");

	const [mostPurchased, setMostPurchased] = useState<
		MostPurchasedItemsObject[]
	>([]);

	const getStats = useCallback(
		async (date_start: string, date_end: string) => {
			if (!UserInfo) return;

			const data: MostPurchasedItemsResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
				params: {
					date_start,
					date_end,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setMostPurchased(data.data.most_purchased_items);
			}
		},
		[UserInfo, response]
	);

	useEffect(() => {
		getStats(
			date_start?.format("YYYY-MM-DD") || "",
			date_end?.format("YYYY-MM-DD") || ""
		);
		loaded.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [purchases]);

	return (
		<div className="flex w-full">
			<Paper
				className="flex w-full flex-col items-center p-4"
				sx={{ p: 2, borderRadius: 3 }}
			>
				<Typography variant="h6">
					<div className="font-bold">Productos mas comprados</div>
				</Typography>
				<div className="flex w-full flex-col space-y-2">
					{mostPurchased.map((item, index) => (
						<div
							key={index}
							className={classNames(
								"flex w-full items-center gap-3 rounded-md p-2",
								"transition duration-150",
								darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
							)}
						>
							<div className="h-10 w-10">
								<img
									src={`${STATIC_URL}/${item.product.primary_image?.file_name}`}
									alt={item.product.name}
									className="h-10 w-10 rounded-lg object-contain"
								/>
							</div>
							<div className="flex w-full flex-col gap-1">
								<Typography>
									<div className="font-medium">{item.product.name}</div>
								</Typography>
								<Typography>
									<div className="text-sm">{item.total}</div>
								</Typography>
							</div>
							<IconButton
								onClick={() => {
									window.open(`/product/${item.product.id}`, "_blank");
								}}
							>
								<OpenInNewIcon />
							</IconButton>
						</div>
					))}
				</div>
			</Paper>
		</div>
	);
};

export default MostPurchasedItems;
