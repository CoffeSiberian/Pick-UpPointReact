import { FC, useState, forwardRef } from "react";
import { Button, Typography } from "@mui/material";
import { API_URL } from "../helpers/configs";
import { useUser } from "../hooks/UserContex";
import useFetch from "../hooks/useFetch";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import QrReader from "./QrReader";
import SnakeBarInfo from "./SnakeBarInfo";
import ModalError from "./ModalError";

// icons
import CloseIcon from "@mui/icons-material/Close";

// types
import { TransitionProps } from "@mui/material/transitions";
import {
    PurchaseResponseQr,
    PurchaseListResponseObject,
} from "../types/responses/PurchaseList";

interface ModalReadPurchaseQrProps {
    open: boolean;
    setOpen: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalReadPurchaseQr: FC<ModalReadPurchaseQrProps> = ({
    open,
    setOpen,
}) => {
    const { UserInfo } = useUser();

    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/purchase/check`,
        "POST"
    );

    const [QrValue, setQrValue] = useState<string | null>(null);
    const [Response, setResponse] = useState<PurchaseListResponseObject | null>(
        null
    );
    const [Error, setError] = useState<ResponseError>({
        status: 200,
        message: "",
        error: false,
    });

    const getData = async () => {
        if (!UserInfo) return;
        if (!QrValue) return;

        const data: PurchaseResponseQr | null = await response(
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${UserInfo.token}`,
                },
            },
            JSON.stringify({
                id: QrValue,
            })
        );

        if (!data) {
            setError({
                status: 404,
                message: "No se pudo comprobar el codigo QR",
                error: true,
            });
            return;
        }
        if (data.status === 200) {
            setResponse(data.data);
            return;
        }

        setError({
            status: data.status,
            message: "No se pudo comprobar el codigo QR",
            error: true,
        });
    };

    const renderViewRead = (): JSX.Element => {
        return (
            <div className="flex flex-col items-center w-full mt-2 max-w-xl">
                <QrReader setScanResults={setQrValue} />
                <Typography variant="h5" component="div">
                    {QrValue}
                </Typography>
                <LoadingButton
                    disabled={QrValue === null}
                    variant="contained"
                    onClick={() => {
                        getData();
                    }}
                    loading={loading}
                    color="info"
                >
                    Verificar QR
                </LoadingButton>
            </div>
        );
    };

    const renderInfoResponse = (): JSX.Element => {
        if (!Response) return <></>;

        return (
            <>
                <Typography variant="h6" component="div">
                    {Response.user.name}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.total}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.payment_id}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.date}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.payment_successful}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.retired}
                </Typography>
                <Typography variant="h6" component="div">
                    {Response.status}
                </Typography>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => {
                        setResponse(null);
                    }}
                >
                    Volver
                </Button>
            </>
        );
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={setOpen}
            TransitionComponent={Transition}
        >
            <ModalError
                open={Error.error}
                setError={() => setError({ ...Error, error: false })}
                message={Error.message}
            />
            <SnakeBarInfo
                open={succes}
                message="Se ha leido el codigo QR correctamente"
                severity="success"
                handleClose={() => setSucces(false)}
            />
            <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={setOpen}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Leer codigo QR
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="flex flex-col items-center">
                {!Response && renderViewRead()}
                {Response && renderInfoResponse()}
            </div>
        </Dialog>
    );
};

export default ModalReadPurchaseQr;
