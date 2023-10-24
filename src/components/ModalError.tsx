import { FC } from "react";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalErrorProps {
    error: boolean;
    msj: string;
    setError: (error: boolean) => void;
}

const ModalError: FC<ModalErrorProps> = ({ error, setError, msj }) => {
    return (
        <Dialog open={error} keepMounted aria-describedby="loading-info">
            <DialogTitle>An error occurred</DialogTitle>
            <DialogContent>
                <div className="flex space-x-2 items-center">
                    <Typography className="break-words">{msj}</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => setError(!error)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalError;
