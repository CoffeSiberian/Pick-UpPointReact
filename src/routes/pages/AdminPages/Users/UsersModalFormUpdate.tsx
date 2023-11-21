import { useState, FC, ChangeEvent, useEffect } from "react";
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
import UsersForms from "./UsersForms";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

// schemas
import {
    userSchema,
    userRutSchema,
    userNameSchema,
    userEmailSchema,
    userPasswordSchema,
} from "../../../../schemas/userSch";

// types
import { StandarResponse } from "../../../../types/responses/StandarResponse";

const UsersModalFormUpdate: FC<UserModalFormUpdateProps> = ({
    open,
    openUserModalForm,
    reloadPage,
    userToEdit,
}) => {
    const { UserInfo } = useUser();
    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/user`,
        "PUT"
    );

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [userForm, setuserForm] = useState<UserDataUpdate>({
        payload: {
            id: "",
            rut: "",
            name: "",
            email: "",
            password: "",
            isAdmin: false,
        },
        error: {
            rut: false,
            name: false,
            email: false,
            password: false,
        },
    });

    const validateForm = async (): Promise<boolean> => {
        const RutValid = await userRutSchema.isValid({
            rut: userForm.payload.rut,
        });
        const NameValid = await userNameSchema.isValid({
            name: userForm.payload.name,
        });
        const EmailValid = await userEmailSchema.isValid({
            email: userForm.payload.email,
        });
        const PasswordValid = await userPasswordSchema.isValid({
            password: userForm.payload.password,
        });

        setuserForm({
            ...userForm,
            error: {
                rut: !RutValid,
                name: !NameValid,
                email: !EmailValid,
                password: !PasswordValid,
            },
        });

        return await userSchema.isValid(userForm.payload);
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
            JSON.stringify(userForm.payload)
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
            openUserModalForm(false);
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

    const handleChangeText = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => {
        const eValue = event.target.value;

        setuserForm({
            ...userForm,
            payload: {
                ...userForm.payload,
                [id]: eValue,
            },
        });
    };

    useEffect(() => {
        if (userToEdit === null) return;
        setuserForm({
            ...userForm,
            payload: {
                id: userToEdit.id,
                rut: userToEdit.rut,
                name: userToEdit.name,
                isAdmin: userToEdit.isAdmin,
                email: userToEdit.email,
                password: "",
            },
        }); // eslint-disable-next-line
    }, [userToEdit]);

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
                message="Usuario actualizado con exito"
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
                onClose={() => openUserModalForm(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                scroll="paper"
                fullWidth
            >
                <DialogTitle className="flex justify-between">
                    Actualizar Usuario
                    <IconButton
                        aria-label="Cerrar ventana"
                        onClick={() => openUserModalForm(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <UsersForms
                        userForm={userForm}
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
                            openUserModalForm(false);
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UsersModalFormUpdate;
