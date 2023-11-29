import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import { useUser } from "../../../../hooks/UserContex";
import {
    DataGrid,
    GridColumnVisibilityModel,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Users = () => {
    const loaded = useRef(false);
    const { UserInfo } = useUser();

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
                valueGetter: ({ value }) => value && new Date(value),
            },
            {
                field: "updatedAt",
                type: "dateTime",
                headerName: "Actualizado",
                width: 180,
                editable: false,
                valueGetter: ({ value }) => value && new Date(value),
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
                                setDataToConfirmDel(
                                    params.row.id,
                                    params.row.name
                                )
                            }
                            size="small"
                            aria-label="Eliminar"
                            color="error"
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => console.log(params.row.id)}
                            size="small"
                            aria-label="Historial"
                            color="warning"
                        >
                            <MonetizationOnIcon />
                        </IconButton>
                    </div>
                ),
            },
        ],
        rows: [],
    });
    const { response, loading } = useFetch(
        `${API_URL}/user/list?limit_start=0&limit_end=5`,
        "GET"
    );

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>({
            id: false,
            brokerId: false,
            status: false,
        });

    const getUsers = async () => {
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
                rows: data.data,
            });
        }
    };

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
        } // eslint-disable-next-line
    }, []);

    return (
        <>
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
            <div className="flex flex-col gap-3">
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
                <div className="flex" style={{ height: 300 }}>
                    <DataGrid
                        {...dataToTable}
                        loading={loading}
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

export default Users;
