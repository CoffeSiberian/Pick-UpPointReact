import { useState, FC, ChangeEvent } from "react";
import { API_URL, FK_STORE } from "../helpers/configs";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ModalLoading from "./ModalLoading";
import ModalError from "./ModalError";
import SnakeBarInfo from "./SnakeBarInfo";

// icons
import NumbersIcon from "@mui/icons-material/Numbers";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CloseIcon from "@mui/icons-material/Close";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";

// types
import { RegisterResponse } from "../types/responses/Register";

// schemas
import {
    registerRutSchema,
    registerNameSchema,
    registerEmailSchema,
    registerPasswordSchema,
    registerFormSchema,
} from "../schemas/registerSch";

interface ModalRegisterProps {
    open: boolean;
    handleClose: () => void;
    openLogin: (open: boolean) => void;
}

interface RegisterPayLoad {
    rut: string;
    name: string;
    email: string;
    password: string;
    fk_store: string;
}

interface RegisterError {
    rut: boolean;
    name: boolean;
    email: boolean;
    password: boolean;
}

interface RegisterData {
    payload: RegisterPayLoad;
    error: RegisterError;
}

const ModalRegister: FC<ModalRegisterProps> = ({
    open,
    handleClose,
    openLogin,
}) => {
    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/register`,
        "POST"
    );

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [RegisterForm, setRegisterForm] = useState<RegisterData>({
        payload: {
            rut: "",
            name: "",
            email: "",
            password: "",
            fk_store: FK_STORE,
        },
        error: {
            rut: false,
            name: false,
            email: false,
            password: false,
        },
    });

    const validateForm = async (): Promise<boolean> => {
        const registerRutValid = await registerRutSchema.isValid({
            rut: RegisterForm.payload.rut,
        });

        const registerNameValid = await registerNameSchema.isValid({
            name: RegisterForm.payload.name,
        });

        const registerEmailValid = await registerEmailSchema.isValid({
            email: RegisterForm.payload.email,
        });

        const registerPasswordValid = await registerPasswordSchema.isValid({
            password: RegisterForm.payload.password,
        });

        setRegisterForm({
            ...RegisterForm,
            error: {
                rut: !registerRutValid,
                name: !registerNameValid,
                email: !registerEmailValid,
                password: !registerPasswordValid,
            },
        });

        return await registerFormSchema.isValid(RegisterForm.payload);
    };

    const sendRegister = async () => {
        const valid = await validateForm();
        if (!valid) return;

        const data: RegisterResponse | null = await response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            JSON.stringify(RegisterForm.payload)
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
            handleClose();
            openLogin(true);
        } else if (data.status === 400) {
            setError({
                status: data.status,
                message: "Email o contraseña incorrectos",
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

        setRegisterForm({
            ...RegisterForm,
            payload: {
                ...RegisterForm.payload,
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
                message="Registro exitoso"
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
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                scroll="paper"
            >
                <DialogTitle className="flex justify-between">
                    Registro
                    <IconButton
                        aria-label="Cerrar ventana"
                        onClick={handleClose}
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
                            helperText={
                                RegisterForm.error.rut && "RUT Invalido"
                            }
                            error={RegisterForm.error.rut}
                            value={RegisterForm.payload.rut}
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
                            color="info"
                            label="Nombre Completo"
                            type="text"
                            helperText={
                                RegisterForm.error.name && "Ingresa un valor"
                            }
                            error={RegisterForm.error.name}
                            value={RegisterForm.payload.name}
                            onChange={(e) => handleChangeText(e, "name")}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            color="info"
                            label="Email"
                            type="email"
                            helperText={
                                RegisterForm.error.email && "Email invalido"
                            }
                            error={RegisterForm.error.email}
                            value={RegisterForm.payload.email}
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
                            color="info"
                            label="Contraseña"
                            type="password"
                            helperText={
                                RegisterForm.error.password &&
                                "Minimo de 5 caracteres"
                            }
                            error={RegisterForm.error.password}
                            value={RegisterForm.payload.password}
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
                    <div className="flex flex-col w-full gap-2">
                        <Button
                            color="success"
                            size="small"
                            variant="contained"
                            endIcon={<LoginIcon />}
                            onClick={sendRegister}
                            className="w-full"
                        >
                            Registrarse
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalRegister;
