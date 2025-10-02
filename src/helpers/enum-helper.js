import { Status } from "../constants/status";

export const getStatusName = (statusCardinal) => {
    let statusName = "???";

    switch (statusCardinal) {
        case Status.PENDING:
            statusName = "Pendiente";
            break;
        case Status.SHIPPED:
            statusName = "Enviado";
            break;
        case Status.DELIVERED:
            statusName = "Entregado";
            break;
    }

    return statusName;
};