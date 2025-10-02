import { Status } from "../../constants/status";
import { getStatusName } from "../../helpers/enum-helper";
import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import "./OrderStats.css";

export default function OrderStats() {
    const { orders } = useContext(OrderContext);

    return (
        <>
            <div className="stats-card">
                <div className="main-stat">
                    <p className="stat-title">Total de Órdenes</p>
                    <p className="stat-value">{orders.length}</p>
                </div>
                <div className="stats-grid">
                {Object.values(Status).map((status, index) => {
                    const count = orders.filter(order => order.status === Number(status)).length;
                    return (
                        <div key={index} className="stat">
                            <p className="stat-title">{getStatusName(status)}</p>
                            <p className="stat-value">{count}</p>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    );
}