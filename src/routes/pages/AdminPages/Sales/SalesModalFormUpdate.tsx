import { useState, FC, useEffect } from "react";
import { useUser } from "../../../../hooks/UserContex";
import { API_URL } from "../../../../helpers/configs";
import useFetch from "../../../../hooks/useFetch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModalLoading from "../../../../components/ModalLoading";
import ModalError from "../../../../components/ModalError";
import SnakeBarInfo from "../../../../components/SnakeBarInfo";
import SalesForms from "./SalesForms";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// schemas
import { categoriesNameSchema } from "../../../../schemas/categoriesSch";

// types
import { StandarResponse } from "../../../../types/responses/StandarResponse";

const SalesModalFormUpdate: FC<CategoriesModalFormUpdateProps> = ({
    open,
    openCategoriesModalForm,
    reloadPage,
    categoriesToEdit,
}) => {
    const { UserInfo } = useUser();
    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/categorie/name`,
        "PUT"
    );

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [Form, setForm] = useState<CategoriesData>({
        payload: {
            id: "",
            name: "",
        },
        error: {
            name: false,
        },
    });

    const validateForm = async (): Promise<boolean> => {
        const NameValid = await categoriesNameSchema.isValid({
            name: Form.payload.name,
        });

        setForm({
            ...Form,
            error: {
                name: !NameValid,
            },
        });

        return NameValid;
    };

    const sendData = async () => {
        const valid = await validateForm();
        if (!valid) return;
        if (UserInfo === null) return;

        const data: StandarResponse | null = await response(
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${UserInfo.token}`,
                },
            },
            JSON.stringify(Form.payload)
        );

        if (data === null) {
            setError({
                status: 500,
                message: "Error, Intenta mas tarde",
                error: true,
            });
            return;
        }

        if (data.status === 200) {
            openCategoriesModalForm(false);
            reloadPage();
        } else if (data.status === 400 || data.status === 401) {
            setError({
                status: data.status,
                message: "Error, Credenciales invalidas",
                error: true,
            });
        } else {
            setError({
                status: data.status,
                message: "Error, Intenta mas tarde",
                error: true,
            });
        }
    };

    const handleChangeText = (value: string, id: string) => {
        setForm({
            ...Form,
            payload: {
                ...Form.payload,
                [id]: value,
            },
        });
    };

    useEffect(() => {
        if (categoriesToEdit === null) return;
        setForm({
            ...Form,
            payload: {
                id: categoriesToEdit.id,
                name: categoriesToEdit.name,
            },
        }); // eslint-disable-next-line
    }, [categoriesToEdit]);

    return (
        <>
            <ModalLoading open={loading} />
            <SnakeBarInfo
                open={Error.error}
                message={Error.message}
                severity="error"
                handleClose={() => setError({ ...Error, error: false })}
            />
            <SnakeBarInfo
                open={succes}
                message="Categoria actualizada con exito"
                severity="success"
                handleClose={() => setSucces(false)}
            />
            <ModalError
                open={Error.error}
                message={Error.message}
                setError={() => setError({ ...Error, error: false })}
            />
            <Dialog
                open={open}
                keepMounted={false}
                onClose={() => openCategoriesModalForm(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                scroll="paper"
                fullWidth
            >
                <DialogTitle className="flex justify-between">
                    Actualizar Categoria
                    <IconButton
                        aria-label="Cerrar ventana"
                        onClick={() => openCategoriesModalForm(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <SalesForms
                        categoriesForm={Form}
                        handleChangeText={handleChangeText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="success"
                        size="small"
                        variant="contained"
                        endIcon={<SaveAsIcon />}
                        onClick={sendData}
                    >
                        Actualizar
                    </Button>
                    <Button
                        color="info"
                        size="small"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        onClick={() => {
                            openCategoriesModalForm(false);
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SalesModalFormUpdate;
