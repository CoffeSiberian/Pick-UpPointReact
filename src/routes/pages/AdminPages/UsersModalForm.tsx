import { useState, FC, ChangeEvent } from "react";
import { useUser } from "../../../hooks/UserContex";
import { API_URL } from "../../../helpers/configs";
import useFetch from "../../../hooks/useFetch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ModalLoading from "../../../components/ModalLoading";
import ModalError from "../../../components/ModalError";
import SnakeBarInfo from "../../../components/SnakeBarInfo";

// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import NumbersIcon from "@mui/icons-material/Numbers";
import AbcIcon from "@mui/icons-material/Abc";
import CloseIcon from "@mui/icons-material/Close";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";

// schemas
import {
    userSchema,
    userRutSchema,
    userNameSchema,
    userEmailSchema,
    userPasswordSchema,
} from "../../../schemas/userSch";

// types
import { UserPost } from "../../../types/responses/userPost";

interface UserModalFormProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
    reloadPage: () => void;
}

interface UserPayLoad {
    rut: string;
    name: string;
    email: string;
    password: string;
}

interface UserError {
    rut: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
}

interface UserData {
    payload: UserPayLoad;
    error: UserError;
}

const UsersModalForm: FC<UserModalFormProps> = ({
    open,
    openUserModalForm,
    reloadPage,
}) => {
    const { UserInfo } = useUser();
    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/user`,
        "POST"
    );

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [userForm, setuserForm] = useState<UserData>({
        payload: {
            rut: "",
            name: "",
            email: "",
            password: "",
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

        const data: UserPost | null = await response(
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
                message="Usuario creado con exito"
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
                    Agregar Usuario
                    <IconButton
                        aria-label="Cerrar ventana"
                        onClick={() => openUserModalForm(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 mt-2">
                        <TextField
                            fullWidth
                            id="rut-user-add"
                            autoComplete="off"
                            color="info"
                            label="RUT"
                            type="text"
                            helperText={userForm.error.rut && "Rut invalido"}
                            error={userForm.error.rut}
                            value={userForm.payload.rut}
                            onChange={(e) => handleChangeText(e, "rut")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            autoComplete="off"
                            id="name-user-add"
                            color="info"
                            label="Nombre"
                            type="text"
                            helperText={
                                userForm.error.name && "Nombre invalido"
                            }
                            error={userForm.error.name}
                            value={userForm.payload.name}
                            onChange={(e) => handleChangeText(e, "name")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AbcIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            autoComplete="off"
                            id="email-user-add"
                            color="info"
                            label="Email"
                            type="text"
                            helperText={
                                userForm.error.email && "Email invalido"
                            }
                            error={userForm.error.email}
                            value={userForm.payload.email}
                            onChange={(e) => handleChangeText(e, "email")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            id="password-user-add"
                            autoComplete="off"
                            color="info"
                            label="Contraseña"
                            type="password"
                            helperText={
                                userForm.error.password &&
                                "Minimo de 5 caracteres"
                            }
                            error={userForm.error.password}
                            value={userForm.payload.password}
                            onChange={(e) => handleChangeText(e, "password")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="success"
                        size="small"
                        variant="contained"
                        endIcon={<SaveAsIcon />}
                        onClick={sendData}
                    >
                        Crear
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

export default UsersModalForm;
