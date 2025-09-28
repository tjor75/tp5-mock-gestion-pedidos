import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Order from "../UI/Order";
import "./OrderList.css";

export default function OrderList() {
    const { orders } = useContext(OrderContext);

    return (
        <div className="order-list">

            {orders.length !== 0 ? (
                <>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <Order key={order.id} order={order} />
                    ))}
                    </tbody>
                </>
            ) : (
                <div className="order-list-empty">
                    <p>No orders available</p>
                </div>
            )}
        </div>
    );
}