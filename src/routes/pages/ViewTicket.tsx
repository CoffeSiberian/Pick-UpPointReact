import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/DarkModeContex";
import { TicketResponseType } from "../../types/TicketType";
import useFetch from "../../hooks/useFetch";
import ModalError from "../../components/ModalError";
import ModalLoading from "../../components/ModalLoading";
import SnakeBarInfo from "../../components/SnakeBarInfo";

const ViewTicket = () => {
    const { id } = useParams();
    const { darkMode } = useDarkMode();
    const cacheTicketId = useRef(id);
    const loaded = useRef(false);
    const { loading, error, succes, setSucces, setError, response } = useFetch(
        `${API_URL}/ticket/cache?id=${id}`,
        "GET"
    );

    const fetchTicket = async () => {
        const rep = await response({
            headers: {},
        });

        if (rep) {
            const ticket: TicketResponseType = rep.data;
            console.log(ticket);
        }
    };

    useEffect(() => {
        if (!loaded.current && cacheTicketId.current) {
            fetchTicket();
        } // eslint-disable-next-line
    }, [cacheTicketId]);

    return (
        <div>
            {loading && <ModalLoading open={loading} />}
            {error && (
                <ModalError
                    error={error}
                    setError={setError}
                    msj="Code not found"
                />
            )}
            {succes && (
                <SnakeBarInfo
                    message="Ticket loaded"
                    severity="success"
                    open={succes}
                    handleClose={() => setSucces(false)}
                />
            )}
        </div>
    );
};

export default ViewTicket;
