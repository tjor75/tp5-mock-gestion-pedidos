import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { Status } from "../../constants/status";
import IconTime from "../UI/Icons/IconTime";
import IconCheck from "../UI/Icons/IconCheck";
import IconForward from "../UI/Icons/IconForward";
import IconResizeVert from "../UI/Icons/IconResizeVert";

export default function OrderFilter() {
    const { filter, setFilter } = useContext(OrderContext);

    const setNextFilter = () => {
        setFilter((prev) => {
            if (prev === null) return Status.PENDING;
            if (prev === Object.values(Status).length - 1) return null;
            return prev + 1;
        });
    }

    switch (filter) {
        case Status.PENDING:
            return (
                <button onClick={() => setNextFilter()}>
                    <IconTime />
                    <span>Pendientes</span>
                </button>
            );
        case Status.SHIPPED:
            return (
                <button onClick={() => setNextFilter()}>
                    <IconForward />
                    <span>Enviados</span>
                </button>
            );
        case Status.DELIVERED:
            return (
                <button onClick={() => setNextFilter()}>
                    <IconCheck />
                    <span>Entregados</span>
                </button>
            );
        default:
            return (
                <button onClick={() => setNextFilter()}>
                    <IconResizeVert />
                    <span>Filtrar</span>
                </button>
            );
    }
}