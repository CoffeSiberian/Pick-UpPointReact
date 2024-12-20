import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { API_URL } from "../../../../helpers/configs";

// Context and hooks
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";

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
import CategoriesModalFormCreate from "./CategoriesModalFormCreate";
import SalesModalFormUpdate from "./CategoriesModalFormUpdate";
import ConfirmDel from "../../../../components/ConfirmDel";

// types
import { CategoriesListResponse } from "../../../../types/responses/CategorieList";
import { Table, modalConfirm } from "./CategoriesType";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Categories = () => {
	const loaded = useRef(false);
	const { UserInfo } = useContext(UserContex);

	const [userModalUpdate, setuserModalUpdate] =
		useState<CategoriesModalFormUpdateState>({
			open: false,
			categoriesToEdit: {
				id: "",
				name: "",
			},
		});

	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});

	const [userModalForm, setuserModalForm] = useState<boolean>(false);
	const [modalConfirmDel, setmodalConfirmDel] = useState<modalConfirm>({
		open: false,
		url: "",
		message: "",
	});
	const [dataToTable, setdataToTable] = useState<Table>({
		columns: [
			{
				field: "name",
				headerName: "Nombre Categoria",
				width: 200,
				editable: false,
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
				field: "updatedAt",
				type: "dateTime",
				headerName: "Actualizado",
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
								setuserModalUpdate({
									open: true,
									categoriesToEdit: {
										id: params.row.id,
										name: params.row.name,
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
	const { response, loading } = useFetch(`${API_URL}/categoriesadmin`, "GET");

	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			brokerId: false,
			status: false,
		});

	const getCategories = useCallback(
		async (page: number, pageSize: number) => {
			if (!UserInfo) return;

			const data: CategoriesListResponse | null = await response({
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${UserInfo.token}`,
				},
				params: {
					store: UserInfo.fk_store,
					limit_start: page * pageSize,
					limit_end: pageSize,
				},
			});

			if (!data) return;
			if (data.status === 200) {
				setdataToTable({
					...dataToTable,
					rows: data.data.categories,
				});
			}
		},
		[UserInfo, dataToTable, response]
	);

	const reloadData = () => {
		getCategories(paginationModel.page, paginationModel.pageSize);
	};

	const openUserModalFormUpdate = (open: boolean) => {
		setuserModalUpdate({ ...userModalUpdate, open });
	};

	const setOpenConfirmDel = (close: boolean) => {
		setmodalConfirmDel({ ...modalConfirmDel, open: close });
	};

	const setDataToConfirmDel = (idCategori: string, name: string) => {
		setmodalConfirmDel({
			url: `${API_URL}/categorie?id=${idCategori}`,
			message: `¿Estas seguro de eliminar la categoria "${name}"?`,
			open: true,
		});
	};

	const onSetPage = (page: number, pageSize: number) => {
		setPaginationModel({ page, pageSize });
		getCategories(page, pageSize);
	};

	useEffect(() => {
		if (!loaded.current) {
			getCategories(paginationModel.page, paginationModel.pageSize);
			loaded.current = true;
		}
	}, [getCategories, paginationModel.page, paginationModel.pageSize]);

	return (
		<>
			<Portal>
				<CategoriesModalFormCreate
					open={userModalForm}
					openUserModalForm={setuserModalForm}
					reloadPage={reloadData}
				/>
				<SalesModalFormUpdate
					open={userModalUpdate.open}
					openCategoriesModalForm={openUserModalFormUpdate}
					reloadPage={reloadData}
					categoriesToEdit={userModalUpdate.categoriesToEdit}
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
						onClick={() => setuserModalForm(true)}
					>
						Crear Categoria
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

export default Categories;
