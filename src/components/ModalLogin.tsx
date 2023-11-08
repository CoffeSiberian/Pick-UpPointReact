import { useState, FC, ChangeEvent } from "react";
import { useUser } from "../hooks/UserContex";
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

// icons
import CloseIcon from "@mui/icons-material/Close";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import EditNoteIcon from "@mui/icons-material/EditNote";

// types
import { LoginResponse } from "../types/responses/Login";

// schemas
import {
    loginEmailSchema,
    loginPasswordSchema,
    loginFormSchema,
} from "../schemas/loginSch";

interface ModalLoginProps {
    open: boolean;
    handleClose: () => void;
    openRegister: () => void;
}

interface LoginPayLoad {
    email: string;
    password: string;
    fk_store: string;
}

interface LoginError {
    email: boolean;
    password: boolean;
}

interface LoginData {
    payload: LoginPayLoad;
    error: LoginError;
}

const ModalLogin: FC<ModalLoginProps> = ({
    open,
    handleClose,
    openRegister,
}) => {
    const { setLocalJwt } = useUser();
    const { loading, response } = useFetch(`${API_URL}/login`, "POST");

    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });
    const [loginForm, setloginForm] = useState<LoginData>({
        payload: {
            email: "",
            password: "",
            fk_store: FK_STORE,
        },
        error: {
            email: false,
            password: false,
        },
    });

    const validateForm = async (): Promise<boolean> => {
        const loginEmailValid = await loginEmailSchema.isValid({
            email: loginForm.payload.email,
        });
        const loginPasswordValid = await loginPasswordSchema.isValid({
            password: loginForm.payload.password,
        });

        setloginForm({
            ...loginForm,
            error: {
                email: !loginEmailValid,
                password: !loginPasswordValid,
            },
        });

        return await loginFormSchema.isValid(loginForm.payload);
    };

    const sendLogin = async () => {
        const valid = await validateForm();
        if (!valid) return;

        const data: LoginResponse | null = await response(
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
            handleClose();
        } else if (data.status === 400 || data.status === 401) {
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
                    Iniciar Sesión
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
                            label="Email"
                            type="email"
                            helperText={
                                loginForm.error.email && "Email invalido"
                            }
                            error={loginForm.error.email}
                            value={loginForm.payload.email}
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
                    <div className="flex flex-col w-full gap-2">
                        <Button
                            color="success"
                            size="small"
                            variant="contained"
                            endIcon={<LoginIcon />}
                            onClick={sendLogin}
                            className="w-full"
                        >
                            Iniciar Sesion
                        </Button>
                        <Button
                            color="info"
                            size="small"
                            variant="contained"
                            endIcon={<EditNoteIcon />}
                            onClick={() => {
                                handleClose();
                                openRegister();
                            }}
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

export default ModalLogin;
