import { useState, useEffect, useRef, useContext } from "react";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

// MUI
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Portal } from "@mui/base/Portal";

// modals
import ModalReadPurchaseQr from "../../../../components/ModalReadPurchaseQr";
import ViewPurchasedProductsModal from "../../../../components/ViewPurchasedProductsModal";
// import SalesModalFormUpdate from "./SalesModalFormUpdate";

// types
import { PurchaseListResponseWithUser } from "../../../../types/responses/PurchaseList";
import { Table } from "./SalesType";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface userPurchaseModalState {
	open: boolean;
	purchaseId: string | null;
}

const Sales = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

	const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];
	const [OpenPurchaseQr, setOpenPurchaseQr] = useState<boolean>(false);
	const [userPurchaseModal, setUserPurchaseModal] =
		useState<userPurchaseModalState>({
			open: false,
			purchaseId: null,
		});

	/*     const [userModalUpdate, setuserModalUpdate] =
        useState<CategoriesModalFormUpdateState>({
            open: false,
            categoriesToEdit: {
                id: "",
                name: "",
            },
        }); */

	// const [ModalForm, setModalForm] = useState<boolean>(false);

	const [dataToTable, setdataToTable] = useState<Table>({
		columns: [
			{
				field: "user.rut",
				headerName: "RUT",
				type: "string",
				minWidth: 100,
				flex: 1,
				editable: false,
				valueGetter: (_, row) => row.user.rut,
			},
			{
				field: "user.name",
				headerName: "Nombre",
				type: "string",
				minWidth: 200,
				flex: 1,
				editable: false,
				valueGetter: (_, row) => row.user.name,
			},
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
			{
				field: "Acciones",
				type: "actions",
				minWidth: 50,
				flex: 1,
				editable: false,
				renderCell: (params) => (
					<div className="flex gap-1">
						<IconButton
							onClick={() => {
								setUserPurchaseModal({
									...userPurchaseModal,
									open: true,
									purchaseId: params.row.id as string,
								});
							}}
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
	const { response, loading } = useFetch(
		`${API_URL}/purchases?limit_start=0&limit_end=15`,
		"GET"
	);

	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			brokerId: false,
			status: false,
		});

	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 30,
	});

	const getSales = async () => {
		if (!UserInfo) return;

		const data: PurchaseListResponseWithUser | null = await response({
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
	};

	const reloadSales = () => {
		getSales();
	};

	/*     const openUserModalFormUpdate = (open: boolean) => {
        setuserModalUpdate({ ...userModalUpdate, open });
    }; */

	useEffect(() => {
		if (!loaded.current) {
			reloadSales();
			loaded.current = true;
		} // eslint-disable-next-line
	}, []);

	return (
		<>
			<Portal>
				{/*             <SalesModalFormUpdate
                open={userModalUpdate.open}
                openCategoriesModalForm={openUserModalFormUpdate}
                reloadPage={reloadCategories}
                categoriesToEdit={userModalUpdate.categoriesToEdit}
				/> */}
				<ViewPurchasedProductsModal
					open={userPurchaseModal.open}
					onClose={() =>
						setUserPurchaseModal({ ...userPurchaseModal, open: false })
					}
					purchaseId={userPurchaseModal.purchaseId}
				/>
				<ModalReadPurchaseQr
					open={OpenPurchaseQr}
					setOpen={() => setOpenPurchaseQr(false)}
				/>
			</Portal>
			<div className="flex w-[95vw] flex-col gap-3 lg:max-w-min">
				<div className="flex justify-end">
					<Button
						color="success"
						size="small"
						variant="contained"
						onClick={() => setOpenPurchaseQr(true)}
						endIcon={<AddCircleIcon />}
					>
						Verificar entrega
					</Button>
				</div>
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
			</div>
		</>
	);
};

export default Sales;
