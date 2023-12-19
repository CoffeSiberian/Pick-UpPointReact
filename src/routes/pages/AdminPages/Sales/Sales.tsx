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
import ModalReadPurchaseQr from "../../../../components/ModalReadPurchaseQr";
// import SalesModalFormUpdate from "./SalesModalFormUpdate";

// types
import { PurchaseListResponse } from "../../../../types/responses/PurchaseList";
import { Table } from "./SalesType";

// icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

const Sales = () => {
    const loaded = useRef(false);
    const { UserInfo } = useUser();
    const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];
    const [OpenPurchaseQr, setOpenPurchaseQr] = useState<boolean>(false);

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
                field: "userRut",
                headerName: "RUT",
                minWidth: 100,
                flex: 1,
                editable: false,
                valueGetter: (params) => params.row.user.rut,
            },
            {
                field: "userName",
                headerName: "Nombre",
                minWidth: 200,
                flex: 1,
                editable: false,
                valueGetter: (params) => params.row.user.name,
            },
            {
                field: "total",
                headerName: "Total",
                minWidth: 80,
                flex: 1,
                editable: false,
            },
            {
                field: "statusCode",
                headerName: "Estado",
                minWidth: 90,
                flex: 1,
                editable: false,
                type: "string",
                valueGetter: (params) => status[params.row.status - 1],
            },
            {
                field: "payment_id",
                headerName: "ID de pago",
                minWidth: 100,
                flex: 1,
                editable: false,
            },
            {
                field: "payment_successful",
                headerName: "Pagado",
                minWidth: 70,
                flex: 1,
                editable: false,
                type: "boolean",
            },
            {
                field: "retired",
                headerName: "Retirado",
                minWidth: 70,
                flex: 1,
                editable: false,
                type: "boolean",
            },
            {
                field: "createdAt",
                type: "dateTime",
                headerName: "Creado",
                minWidth: 160,
                flex: 1,
                editable: false,
                valueGetter: ({ value }) => value && new Date(value),
            },
            {
                field: "updatedAt",
                type: "dateTime",
                headerName: "Actualizado",
                minWidth: 160,
                flex: 1,
                editable: false,
                valueGetter: ({ value }) => value && new Date(value),
            },
            {
                field: "Acciones",
                type: "actions",
                minWidth: 50,
                flex: 1,
                editable: false,
                renderCell: (params: GridRenderCellParams) => (
                    <div className="flex gap-1">
                        <IconButton
                            /*                             onClick={() => {
                                setuserModalUpdate({
                                    open: true,
                                    categoriesToEdit: {
                                        id: params.row.id,
                                        name: params.row.name,
                                    },
                                });
                            }} */
                            size="small"
                            aria-label="Editar"
                            color="info"
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                ),
            },
        ],
        rows: [],
    });
    const { response, loading } = useFetch(
        `${API_URL}/purchases?limit_start=0&limit_end=5`,
        "GET"
    );

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>({
            id: false,
            brokerId: false,
            status: false,
        });

    const getCategories = async () => {
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
                rows: data.data,
            });
        }
    };

    const reloadCategories = () => {
        getCategories();
    };

    /*     const openUserModalFormUpdate = (open: boolean) => {
        setuserModalUpdate({ ...userModalUpdate, open });
    }; */

    useEffect(() => {
        if (!loaded.current) {
            reloadCategories();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    return (
        <>
            {/*             <SalesModalFormUpdate
                open={userModalUpdate.open}
                openCategoriesModalForm={openUserModalFormUpdate}
                reloadPage={reloadCategories}
                categoriesToEdit={userModalUpdate.categoriesToEdit}
            /> */}
            <ModalReadPurchaseQr
                open={OpenPurchaseQr}
                setOpen={() => setOpenPurchaseQr(false)}
            />
            <div className="flex flex-col gap-3">
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

export default Sales;
