import { useContext, useState, useCallback, useRef, useEffect } from "react";
import { API_URL } from "../../../helpers/configs";

// Context and hooks
import { UserContex } from "../../../hooks/UserContex";
import useFetch from "../../../hooks/useFetch";

// MUI
import Paper from "@mui/material/Paper";
import { Portal } from "@mui/material";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";

// modals
import ViewPurchasedProductsModal from "../../../components/ViewPurchasedProductsModal";

// types
import { GridColDef } from "@mui/x-data-grid";
import { Purchases } from "../../../types/model";
import { PurchaseListResponse } from "../../../types/responses/PurchaseList";

// icons
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface UserPurchaseTable {
	columns: GridColDef[];
	rows: Purchases[];
}

interface userPurchaseModalState {
	open: boolean;
	purchaseId: string | null;
}

const UserPurchaseList = () => {
	const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

	const [userPurchaseModal, setUserPurchaseModal] =
		useState<userPurchaseModalState>({
			open: false,
			purchaseId: null,
		});
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
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
				minWidth: 115,
				flex: 1,
				editable: false,
			},
			{
				field: "payment_successful",
				headerName: "Pagado",
				type: "boolean",
				minWidth: 95,
				flex: 1,
				editable: false,
			},
			{
				field: "retired",
				headerName: "Retirado",
				type: "boolean",
				minWidth: 100,
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
			{
				field: "Acciones",
				type: "actions",
				minWidth: 35,
				flex: 1,
				editable: false,
				renderCell: (params) => (
					<div className="flex gap-1">
						<IconButton
							onClick={() =>
								setUserPurchaseModal({
									open: true,
									purchaseId: params.row.id as string,
								})
							}
							size="small"
							aria-label="Ver compras"
						>
							<RemoveRedEyeIcon />
						</IconButton>
					</div>
				),
			},
		],
		rows: [],
	});

	const { response, loading } = useFetch(`${API_URL}/purchases/profile`, "GET");

	const openUserPurchaseModal = (open: boolean) => {
		setUserPurchaseModal({ open, purchaseId: null });
	};

	const getSales = useCallback(
		async (page: number, pageSize: number) => {
			if (!UserInfo) return;

			const data: PurchaseListResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
				params: {
					limit_start: page * pageSize,
					limit_end: pageSize,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setdataToTable({
					...dataToTable,
					rows: data.data.purchases,
				});
			}
		},
		[UserInfo, dataToTable, response]
	);

	const onSetPage = (page: number, pageSize: number) => {
		setPaginationModel({ page, pageSize });
		getSales(page, pageSize);
	};

	useEffect(() => {
		if (!loaded.current) {
			getSales(paginationModel.page, paginationModel.pageSize);
			loaded.current = true;
		}
	}, [getSales, paginationModel.page, paginationModel.pageSize]);

	return (
		<>
			<Portal>
				<ViewPurchasedProductsModal
					open={userPurchaseModal.open}
					onClose={openUserPurchaseModal}
					purchaseId={userPurchaseModal.purchaseId}
					isProfile
				/>
			</Portal>
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
					pageSizeOptions={[10]}
					rows={dataToTable.rows}
					initialState={{ pagination: { rowCount: -1 } }}
					paginationMode="server"
					paginationModel={paginationModel}
					onPaginationModelChange={({ page, pageSize }) =>
						onSetPage(page, pageSize)
					}
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
		</>
	);
};

export default UserPurchaseList;
