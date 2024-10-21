import { useState, useEffect, useRef, useContext, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import { UserContex } from "../../../../hooks/UserContex";
import {
	DataGrid,
	GridColumnVisibilityModel,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
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
	const { response, loading } = useFetch(
		`${API_URL}/categoriesadmin?store=${UserInfo?.fk_store}&limit_start=0&limit_end=15`,
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

	const getCategories = useCallback(async () => {
		if (!UserInfo) return;

		const data: CategoriesListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setdataToTable({
				...dataToTable,
				rows: data.data.categories,
			});
		}
	}, [UserInfo, dataToTable, response]);

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

	useEffect(() => {
		if (!loaded.current) {
			getCategories();
			loaded.current = true;
		}
	}, [getCategories]);

	return (
		<>
			<CategoriesModalFormCreate
				open={userModalForm}
				openUserModalForm={setuserModalForm}
				reloadPage={getCategories}
			/>
			<SalesModalFormUpdate
				open={userModalUpdate.open}
				openCategoriesModalForm={openUserModalFormUpdate}
				reloadPage={getCategories}
				categoriesToEdit={userModalUpdate.categoriesToEdit}
			/>
			<ConfirmDel
				open={modalConfirmDel.open}
				setOpen={setOpenConfirmDel}
				reloadPage={getCategories}
				url={modalConfirmDel.url}
				message={modalConfirmDel.message}
			/>
			<div className="flex flex-col gap-3">
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
				<div className="flex min-h-52 flex-col items-center">
					<DataGrid
						className="max-w-[715px]"
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
					/>
				</div>
			</div>
		</>
	);
};

export default Categories;
