import {
	FC,
	useState,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from "react";
import { API_URL } from "../../../../helpers/configs";
import dayjs from "dayjs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

// MUI
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

// icons

// types
import {
	MostPurchasedItemsResponse,
	MostPurchasedItemsObject,
} from "../../../../types/responses/Purchase";

interface DateRange {
	date_start: dayjs.Dayjs | null;
	date_end: dayjs.Dayjs | null;
}

const MostPurchasedItems: FC<DateRange> = ({ date_start, date_end }) => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

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
		if (!loaded.current) {
			getStats(
				date_start?.format("YYYY-MM-DD") || "",
				date_end?.format("YYYY-MM-DD") || ""
			);
			loaded.current = true;
		}
	}, [date_end, date_start, getStats]);

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
						<div key={index} className="flex justify-between">
							<Typography>
								<div className="font-medium">{item.product.name}</div>
							</Typography>
							<Typography>{item.total}</Typography>
						</div>
					))}
				</div>
			</Paper>
		</div>
	);
};

export default MostPurchasedItems;
