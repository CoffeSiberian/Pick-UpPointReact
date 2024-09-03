import { FC, useState, forwardRef } from "react";
import { useDarkMode } from "../hooks/DarkModeContex";
import { Button, Typography } from "@mui/material";
import { API_URL } from "../helpers/configs";
import { useUser } from "../hooks/UserContex";
import { formatDate } from "../helpers/formatDate";
import useFetch from "../hooks/useFetch";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import QrReader from "./QrReader";
import classNames from "classnames";
import SnakeBarInfo from "./SnakeBarInfo";
import ModalError from "./ModalError";

// icons
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import NumbersIcon from "@mui/icons-material/Numbers";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// types
import { TransitionProps } from "@mui/material/transitions";
import {
    PurchaseResponseQr,
    PurchaseListResponseObject,
} from "../types/responses/PurchaseList";
import { StandarResponse } from "../types/responses/StandarResponse";

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
    const { themeTatailwind } = useDarkMode();
    const status = ["Pendiente", "Pagado", "Rechazado", "Anulado"];

    const { loading, response, succes, setSucces } = useFetch(
        `${API_URL}/purchase/check`,
        "POST"
    );

    const {
        loading: loading2,
        response: response2,
        succes: succes2,
        setSucces: setSucces2,
    } = useFetch(`${API_URL}/purchase/retired`, "PUT");

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

    const dataRetired = async () => {
        if (!UserInfo) return;
        if (!Response) return;

        const data: StandarResponse | null = await response2(
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${UserInfo.token}`,
                },
            },
            JSON.stringify({
                id: Response.id,
                retired: true,
                fk_user: Response.user.id,
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
            await getData();
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
            <div
                className={classNames(
                    "flex flex-col max-w-md w-full",
                    themeTatailwind.secondary.main,
                    "rounded-lg border-2 border-transparent",
                    themeTatailwind.primary.border_color,
                    "shadow-2xl m-4 mb-12 p-4"
                )}
            >
                <div className="flex h-full pb-2">
                    <Typography variant="h6">
                        <div className="flex items-center justify-center">
                            <AccountCircleIcon className="mr-1" />
                            <div>{Response.user.name}</div>
                        </div>
                    </Typography>
                </div>
                <div className="flex flex-col h-full pb-2">
                    <Typography
                        component={"div"}
                        className="pt-2"
                        color={themeTatailwind.primary.color}
                        variant="body1"
                    >
                        <div className="flex">
                            <NumbersIcon className="mr-1" />
                            <div>
                                <b className="mr-2">Total:</b>
                                {Response.total.toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
                            </div>
                        </div>
                        <div className="flex">
                            <AssuredWorkloadIcon className="mr-1" />
                            <div>
                                <b className="mr-2">ID FLOW:</b>
                                {Response.payment_id}
                            </div>
                        </div>
                        <div className="flex">
                            <ScheduleIcon className="mr-1" />
                            <div>
                                <b className="mr-2">Fecha:</b>
                                {formatDate(Response.date)}
                            </div>
                        </div>
                        <div className="flex">
                            <InventoryIcon className="mr-1" />
                            <div>
                                <b className="mr-2">Retirado:</b>
                                {Response.retired ? (
                                    <OfflinePinIcon />
                                ) : (
                                    <CancelIcon />
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <PaymentsIcon className="mr-1" />
                            <div>
                                <b className="mr-2">Pago:</b>
                                {status[Response.status - 1]}
                            </div>
                        </div>
                    </Typography>
                </div>
                <div className="flex justify-center w-full gap-3">
                    <LoadingButton
                        disabled={Response.retired || Response.status !== 2}
                        variant="contained"
                        loading={loading2}
                        onClick={() => {
                            dataRetired();
                        }}
                        color="error"
                    >
                        Marcar como retirado
                    </LoadingButton>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            setResponse(null);
                        }}
                    >
                        Volver
                    </Button>
                </div>
            </div>
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
            <SnakeBarInfo
                open={succes2}
                message="Se ha marcado como retirado correctamente"
                severity="success"
                handleClose={() => setSucces2(false)}
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
