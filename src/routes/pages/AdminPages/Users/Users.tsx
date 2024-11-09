import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import { Portal } from "@mui/base/Portal";

// modals
import UsersModalFormCrate from "./UsersModalFormCreate";
import UsersModalFormUpdate from "./UsersModalFormUpdate";
import ConfirmDel from "../../../../components/ConfirmDel";

// types
import { UserListResponse } from "../../../../types/responses/UserList";
import { Table, modalConfirm } from "./UsersType";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import IconButton from "@mui/material/IconButton";

const Users = () => {
	const loaded = useRef(false);
	const navigate = useNavigate();
	const { UserInfo } = useContext(UserContex);

	const [userModalUpdate, setuserModalUpdate] =
		useState<UserModalFormUpdateState>({
			open: false,
			userToEdit: {
				id: "",
				rut: "",
				name: "",
				email: "",
				isAdmin: false,
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
			{ field: "id", headerName: "ID", width: 70, editable: false },
			{ field: "rut", headerName: "RUT", width: 130, editable: false },
			{
				field: "name",
				headerName: "Nombre",
				width: 200,
				editable: false,
			},
			{
				field: "email",
				headerName: "Email",
				width: 200,
				editable: false,
			},
			{
				field: "isAdmin",
				type: "boolean",
				headerName: "Admin",
				width: 130,
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
									userToEdit: {
										id: params.row.id,
										rut: params.row.rut,
										name: params.row.name,
										email: params.row.email,
										isAdmin: params.row.isAdmin,
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
						<IconButton
							onClick={() => navigate(`/admin/users/${params.row.id}`)}
							size="small"
							aria-label="Historial"
							color="warning"
						>
							<PermContactCalendarIcon />
						</IconButton>
					</div>
				),
			},
		],
		rows: [],
	});
	const { response, loading } = useFetch(
		`${API_URL}/user/list?limit_start=0&limit_end=15`,
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

	const getUsers = useCallback(async () => {
		if (!UserInfo) return;

		const data: UserListResponse | null = await response({
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${UserInfo.token}`,
			},
		});

		if (!data) return;
		if (data.status === 200) {
			setdataToTable({
				...dataToTable,
				rows: data.data.users,
			});
		}
	}, [UserInfo, dataToTable, response]);

	const reloadUsers = () => {
		getUsers();
	};

	const openUserModalFormUpdate = (open: boolean) => {
		setuserModalUpdate({ ...userModalUpdate, open });
	};

	const setOpenConfirmDel = (close: boolean) => {
		setmodalConfirmDel({ ...modalConfirmDel, open: close });
	};

	const setDataToConfirmDel = (idUser: string, username: string) => {
		setmodalConfirmDel({
			url: `${API_URL}/user?id=${idUser}`,
			message: `¿Estas seguro de eliminar el usuario "${username}"?`,
			open: true,
		});
	};

	useEffect(() => {
		if (!loaded.current) {
			getUsers();
			loaded.current = true;
		}
	}, [getUsers]);

	return (
		<>
			<Portal>
				<UsersModalFormCrate
					open={userModalForm}
					openUserModalForm={setuserModalForm}
					reloadPage={reloadUsers}
				/>
				<UsersModalFormUpdate
					open={userModalUpdate.open}
					openUserModalForm={openUserModalFormUpdate}
					reloadPage={reloadUsers}
					userToEdit={userModalUpdate.userToEdit}
				/>
				<ConfirmDel
					open={modalConfirmDel.open}
					setOpen={setOpenConfirmDel}
					reloadPage={reloadUsers}
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
						Crear Usuario
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

export default Users;
