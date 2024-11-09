import {
	useContext,
	useState,
	useCallback,
	useRef,
	useEffect,
	FC,
} from "react";
import { API_URL } from "../helpers/configs";

// Context and hooks
import { UserContex } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";

// MUI
import Paper from "@mui/material/Paper";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";

// types
import { GridColDef } from "@mui/x-data-grid";
import { Purchases } from "../types/model";
import { PurchaseListResponse } from "../types/responses/PurchaseList";

interface UserPurchaseTable {
	columns: GridColDef[];
	rows: Purchases[];
}

interface UserPurchaseListProps {
	userId: string;
}

const UserPurchaseList: FC<UserPurchaseListProps> = ({ userId }) => {
	const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 30,
	});
	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			brokerId: false,
			status: false,
		});
	const [dataToTable, setdataToTable] = useState<UserPurchaseTable>({
		columns: [
			{
				field: "total",
				headerName: "Total",
				type: "number",
				minWidth: 80,
				flex: 1,
				editable: false,
			},
			{
				field: "status",
				headerName: "Estado",
				type: "string",
				minWidth: 90,
				flex: 1,
				editable: false,
				valueGetter: (params) => status[params - 1],
			},
			{
				field: "payment_id",
				headerName: "ID de pago",
				type: "string",
				minWidth: 110,
				flex: 1,
				editable: false,
			},
			{
				field: "payment_successful",
				headerName: "Pagado",
				type: "boolean",
				minWidth: 70,
				flex: 1,
				editable: false,
			},
			{
				field: "retired",
				headerName: "Retirado",
				type: "boolean",
				minWidth: 80,
				flex: 1,
				editable: false,
			},
			{
				field: "createdAt",
				headerName: "Creado",
				type: "dateTime",
				minWidth: 160,
				flex: 1,
				editable: false,
				valueGetter: (date) => {
					if (typeof date === "string") {
						return new Date(date);
					}
				},
			},
			{
				field: "updatedAt",
				headerName: "Actualizado",
				type: "dateTime",
				minWidth: 160,
				flex: 1,
				editable: false,
				valueGetter: (date) => {
					if (typeof date === "string") {
						return new Date(date);
					}
				},
			},
		],
		rows: [],
	});

	const { response, loading } = useFetch(
		`${API_URL}/purchases/user?id=${userId}&limit_start=0&limit_end=10`,
		"GET"
	);

	const getSales = useCallback(async () => {
		if (!UserInfo) return;

		const data: PurchaseListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setdataToTable({
				...dataToTable,
				rows: data.data.purchases,
			});
		}
	}, [UserInfo, dataToTable, response]);

	useEffect(() => {
		if (!loaded.current) {
			getSales();
			loaded.current = true;
		}
	}, [getSales]);

	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "400px",
			}}
		>
			<DataGrid
				className="max-w-[1310px]"
				{...dataToTable}
				loading={loading}
				pageSizeOptions={[30]}
				rows={dataToTable.rows}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
				columnVisibilityModel={columnVisibilityModel}
				onColumnVisibilityModelChange={(newModel) =>
					setColumnVisibilityModel(newModel)
				}
				disableColumnFilter
				disableColumnResize
				disableColumnSorting
				disableDensitySelector
				disableRowSelectionOnClick
			/>
		</Paper>
	);
};

export default UserPurchaseList;
