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
import CloseIcon from "@mui/icons-material/Close";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import EditNoteIcon from "@mui/icons-material/EditNote";

// schemas
import {
    userSchema,
    userRutSchema,
    userNameSchema,
    userEmailSchema,
    userPasswordSchema,
} from "../../../schemas/userSch";

interface UserModalFormProps {
    open: boolean;
    openUserModalForm: (open: boolean) => void;
}

interface UserPayLoad {
    rut: string;
    name: string;
    email: string;
    password: string;
}

interface LoginError {
    rut: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
}

interface LoginData {
    payload: UserPayLoad;
    error: LoginError;
}

const UsersModalForm: FC<UserModalFormProps> = ({
    open,
    openUserModalForm,
}) => {
    const { setLocalJwt } = useUser();
    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/login`,
        "POST"
    );

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [loginForm, setloginForm] = useState<LoginData>({
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
            rut: loginForm.payload.rut,
        });
        const NameValid = await userNameSchema.isValid({
            name: loginForm.payload.name,
        });
        const EmailValid = await userEmailSchema.isValid({
            email: loginForm.payload.email,
        });
        const PasswordValid = await userPasswordSchema.isValid({
            password: loginForm.payload.password,
        });

        setloginForm({
            ...loginForm,
            error: {
                rut: !RutValid,
                name: !NameValid,
                email: !EmailValid,
                password: !PasswordValid,
            },
        });

        return await userSchema.isValid(loginForm.payload);
    };

    const sendLogin = async () => {
        const valid = await validateForm();
        if (!valid) return;

        const data: any | null = await response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            JSON.stringify(loginForm.payload)
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
            setLocalJwt(data.data.jwt);
            openUserModalForm(false);
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

        setloginForm({
            ...loginForm,
            payload: {
                ...loginForm.payload,
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
                            color="info"
                            label="RUT"
                            type="text"
                            helperText={loginForm.error.rut && "Rut invalido"}
                            error={loginForm.error.rut}
                            value={loginForm.payload.rut}
                            onChange={(e) => handleChangeText(e, "rut")}
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
                            color="info"
                            label="Nombre"
                            type="text"
                            helperText={
                                loginForm.error.name && "Nombre invalido"
                            }
                            error={loginForm.error.name}
                            value={loginForm.payload.name}
                            onChange={(e) => handleChangeText(e, "name")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            color="info"
                            label="Email"
                            type="text"
                            helperText={
                                loginForm.error.email && "Email invalido"
                            }
                            error={loginForm.error.email}
                            value={loginForm.payload.email}
                            onChange={(e) => handleChangeText(e, "email")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            color="info"
                            label="Contraseña"
                            type="password"
                            helperText={
                                loginForm.error.password &&
                                "Minimo de 5 caracteres"
                            }
                            error={loginForm.error.password}
                            value={loginForm.payload.password}
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
                        endIcon={<LoginIcon />}
                        onClick={sendLogin}
                    >
                        Crear
                    </Button>
                    <Button
                        color="info"
                        size="small"
                        variant="contained"
                        endIcon={<EditNoteIcon />}
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
