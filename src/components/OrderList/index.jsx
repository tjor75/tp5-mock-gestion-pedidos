import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Order from "../Order";
import "./OrderList.css";

export default function OrderList() {
    const { orders, filter } = useContext(OrderContext);
    const filteredOrders = filter === null ? orders : orders.filter(order => order.status === filter);

    return (
        <section className="order-list">
            {filteredOrders.length !== 0 ? (
                <>
                    <div className="order-list-header">
                        <p>ID</p>
                        <p>Cliente</p>
                        <p>Fecha</p>
                        <p>Estado</p>
                        <p>Acciones</p>
                    </div>
                    <div className="order-list-rows">
                        {filteredOrders.map(order => (
                            <Order key={order.id} order={order} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="order-list-empty">
                    <p>No orders available</p>
                </div>
            )}
        </section>
    );
}