import { FC } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

//icons
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface ModalLoginProps {
    open: boolean;
    handleClose: () => void;
    openRegister: () => void;
}

const ModalLogin: FC<ModalLoginProps> = ({
    open,
    handleClose,
    openRegister,
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            scroll="paper"
        >
            <DialogTitle>
                Iniciar Sesion
                <IconButton aria-label="Cerrar ventana">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="flex flex-col gap-3">
                <TextField fullWidth label="fullWidth" id="fullWidth" />
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    variant="contained"
                    endIcon={<LoginIcon />}
                    onClick={handleClose}
                >
                    Iniciar Sesion
                </Button>
                <Button
                    color="info"
                    variant="contained"
                    endIcon={<EditNoteIcon />}
                    onClick={() => {
                        handleClose();
                        openRegister();
                    }}
                >
                    Registrarse
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalLogin;
