import { FC, useState, useContext } from "react";
import { UserContex } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModalLoading from "./ModalLoading";
import SnakeBarInfo from "./SnakeBarInfo";

// types
import { StandarResponse } from "../types/responses/StandarResponse";

// icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";

interface ConfirmDelProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    reloadPage: () => void;
    url: string;
    message: string;
}

const ConfirmDel: FC<ConfirmDelProps> = ({
    open,
    setOpen,
    reloadPage,
    url,
    message,
}) => {
    const { UserInfo } = useContext(UserContex);
    const { response, loading, succes, setSucces } = useFetch(url, "DELETE");
    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });

    const handleDelete = async () => {
        if (!UserInfo) return;

        const data: StandarResponse | null = await response({
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${UserInfo.token}`,
            },
        });

        if (data) {
            if (data.status === 200) {
                setOpen(false);
                reloadPage();
            } else {
                setError({
                    status: data.status,
                    message: data.data.message,
                    error: true,
                });
            }
        }
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
                message="Usuario eliminado con exito"
                severity="success"
                handleClose={() => setSucces(false)}
            />
            <Dialog
                fullScreen={false}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>Confirmar</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        autoFocus
                        onClick={() => handleDelete()}
                        endIcon={<DeleteForeverIcon />}
                    >
                        Eliminar
                    </Button>
                    <Button
                        color="info"
                        autoFocus
                        onClick={() => setOpen(false)}
                        endIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmDel;
