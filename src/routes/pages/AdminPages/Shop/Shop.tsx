import { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { API_URL, FK_STORE } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import {
    DataGrid,
    GridColumnVisibilityModel,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
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
                    </div>
                ),
            },
        ],
        rows: [],
    });
    const { response, loading } = useFetch(
        `${API_URL}/products?store=${FK_STORE}&limit_start=0&limit_end=15`,
        "GET"
    );

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>({
            id: false,
            brokerId: false,
            status: false,
        });

    const getData = async () => {
        const data: ProductsListResponse | null = await response({
            headers: {
                "Content-Type": "application/json",
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

    const reloadData = () => {
        getData();
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
            message: `¿Está seguro que desea eliminar el producto "${name}`,
            open: true,
        });
    };

    useEffect(() => {
        if (!loaded.current) {
            getData();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    return (
        <>
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
            />
            <ConfirmDel
                open={modalConfirmDel.open}
                setOpen={setOpenConfirmDel}
                reloadPage={reloadData}
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
                        onClick={() => setModalForm(true)}
                    >
                        Crear Producto
                    </Button>
                </div>
                <div className="flex justify-center">
                    <DataGrid
                        className="max-w-[1310px]"
                        autoHeight={true}
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

export default Shop;
