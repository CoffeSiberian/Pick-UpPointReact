import { useState, useEffect, useCallback, useRef } from "react";
import { API_URL, FK_STORE } from "../../../../helpers/configs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";

// MUI
import {
	DataGrid,
	GridColumnVisibilityModel,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Portal } from "@mui/base/Portal";

// modals
import SalesModalFormCrate from "./ShopModalFormCreate";
import SalesModalFormUpdate from "./ShopModalFormUpdate";
import ConfirmDel from "../../../../components/ConfirmDel";

// types
import { ProductsListResponse } from "../../../../types/responses/ProductsList";
import { Table, modalConfirm } from "./ShopType";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Shop = () => {
	const loaded = useRef(false);

	const [productModalUpdate, setproductModalUpdate] =
		useState<ProductModalFormUpdateState>({
			open: false,
			productToEdit: {
				id: "",
				name: "",
				description: "",
				stock: 0,
				price: 0,
				fk_category: "",
			},
		});

	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});

	const [ModalForm, setModalForm] = useState<boolean>(false);
	const [modalConfirmDel, setmodalConfirmDel] = useState<modalConfirm>({
		open: false,
		url: "",
		message: "",
	});
	const [dataToTable, setdataToTable] = useState<Table>({
		columns: [
			{ field: "id", headerName: "ID", width: 70, editable: false },
			{
				field: "name",
				headerName: "Nombre",
				width: 200,
				editable: false,
			},
			{
				field: "description",
				headerName: "Descripción",
				width: 200,
				editable: false,
			},
			{
				field: "price",
				type: "string",
				headerName: "Precio",
				width: 130,
				editable: false,
			},
			{
				field: "category",
				type: "string",
				headerName: "Categoría",
				width: 130,
				editable: false,
				valueGetter: ({ name }) => name,
			},
			{
				field: "stock",
				type: "string",
				headerName: "Stock",
				width: 130,
				editable: false,
				valueFormatter: ({ quantity }) => quantity,
			},
			{
				field: "createdAt",
				type: "dateTime",
				headerName: "Creado",
				width: 180,
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
				headerName: "Acciones",
				width: 150,
				editable: false,
				renderCell: (params: GridRenderCellParams) => (
					<div className="flex gap-1">
						<IconButton
							onClick={() => {
								setproductModalUpdate({
									open: true,
									productToEdit: {
										id: params.row.id,
										name: params.row.name,
										description: params.row.description,
										stock: params.row.stock.quantity,
										price: params.row.price,
										fk_category: params.row.fk_category,
									},
								});
							}}
							size="small"
							aria-label="Editar"
							color="info"
						>
							<EditIcon />
						</IconButton>
						<IconButton
							onClick={() =>
								setDataToConfirmDel(params.row.id, params.row.name)
							}
							size="small"
							aria-label="Eliminar"
							color="error"
						>
							<DeleteForeverIcon />
						</IconButton>
					</div>
				),
			},
		],
		rows: [],
	});

	const { response, loading } = useFetch(`${API_URL}/products`, "GET");

	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			brokerId: false,
			status: false,
		});

	const getData = useCallback(
		async (page: number, pageSize: number) => {
			const data: ProductsListResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					store: FK_STORE,
					limit_start: page * pageSize,
					limit_end: pageSize,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setdataToTable({
					...dataToTable,
					rows: data.data.products,
				});
			}
		},
		[dataToTable, response]
	);

	const reloadData = () => {
		getData(paginationModel.page, paginationModel.pageSize);
	};

	const openModalFormUpdate = (open: boolean) => {
		setproductModalUpdate({ ...productModalUpdate, open });
	};

	const setOpenConfirmDel = (close: boolean) => {
		setmodalConfirmDel({ ...modalConfirmDel, open: close });
	};

	const setDataToConfirmDel = (id: string, name: string) => {
		setmodalConfirmDel({
			url: `${API_URL}/product?id=${id}`,
			message: `¿Está seguro que desea eliminar el producto "${name}"`,
			open: true,
		});
	};

	const onSetPage = (page: number, pageSize: number) => {
		setPaginationModel({ page, pageSize });
		getData(page, pageSize);
	};

	useEffect(() => {
		if (!loaded.current) {
			getData(paginationModel.page, paginationModel.pageSize);
			loaded.current = true;
		}
	}, [getData, paginationModel.page, paginationModel.pageSize]);

	return (
		<>
			<Portal>
				<SalesModalFormCrate
					open={ModalForm}
					openProductModalForm={setModalForm}
					reloadPage={reloadData}
				/>
				<SalesModalFormUpdate
					open={productModalUpdate.open}
					openProductModalForm={openModalFormUpdate}
					reloadPage={reloadData}
					productToEdit={productModalUpdate.productToEdit}
					productId={productModalUpdate.productToEdit.id}
				/>
				<ConfirmDel
					open={modalConfirmDel.open}
					setOpen={setOpenConfirmDel}
					reloadPage={reloadData}
					url={modalConfirmDel.url}
					message={modalConfirmDel.message}
				/>
			</Portal>
			<div className="flex w-[95vw] flex-col gap-3 lg:max-w-min">
				<div className="flex justify-end">
					<Button
						color="success"
						size="small"
						variant="contained"
						endIcon={<AddCircleIcon />}
						onClick={() => setModalForm(true)}
					>
						Crear Producto
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
			</div>
		</>
	);
};

export default Shop;
