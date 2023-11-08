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

interface ModalLoginProps {
    open: boolean;
    handleClose: () => void;
    openRegister: () => void;
}

interface LoginData {
    email: string;
    password: string;
    fk_store: string;
}

const ModalLogin: FC<ModalLoginProps> = ({
    open,
    handleClose,
    openRegister,
}) => {
    const { setLocalJwt } = useUser();
    const { loading, error, response, setError } = useFetch(
        `${API_URL}/login`,
        "POST"
    );
    const [loginForm, setloginForm] = useState<LoginData>({
        email: "",
        password: "",
        fk_store: FK_STORE,
    });

    const sendLogin = async () => {
        const data: LoginResponse | null = await response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
            JSON.stringify(loginForm)
        );

        if (data === null) return;
        if (data.status === 200) {
            setLocalJwt(data.data.jwt);
            handleClose();
        }
    };

    const handleChangeText = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: string
    ) => {
        const eValue = event.target.value;

        setloginForm({
            ...loginForm,
            [id]: eValue,
        });
    };

    return (
        <>
            <ModalLoading open={loading} />
            <ModalError
                open={error}
                message="Error al iniciar sesión. Intente de nuevo mas tarde."
                setError={() => setError(false)}
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
                            value={loginForm.email}
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
                            value={loginForm.password}
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
