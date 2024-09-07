import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import { useUser } from "../../../../hooks/UserContex";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
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
                minWidth: 100,
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
                minWidth: 70,
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
                renderCell: () => (
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
                <div className="flex justify-center">
                    <DataGrid
                        className="max-w-[1310px]"
                        autoHeight={true}
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

export default Sales;
