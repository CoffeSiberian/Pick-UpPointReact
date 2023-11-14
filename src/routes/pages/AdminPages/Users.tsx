import { useState, useEffect, useRef } from "react";
import { API_URL } from "../../../helpers/configs";
import useFetch from "../../../hooks/useFetch";
import { useUser } from "../../../hooks/UserContex";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";

// types
import { GridColDef } from "@mui/x-data-grid";
import { UserListResponse } from "../../../types/responses/UserList";
import { Users as UsersTypes } from "../../../types/model";

interface Table {
    columns: GridColDef[];
    rows: UsersTypes[];
}

const Users = () => {
    const loaded = useRef(false);

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
        ],
        rows: [],
    });
    const { UserInfo } = useUser();
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

    useEffect(() => {
        if (!loaded.current) {
            getUsers();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    return (
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
    );
};

export default Users;
