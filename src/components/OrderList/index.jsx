import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Order from "../UI/Order";
import "./OrderList.css";

export default function OrderList() {
    const { orders } = useContext(OrderContext);

    return (
        <section className="order-list">
            {orders.length !== 0 ? (
                <>
                    <div>
                        <p>ID</p>
                        <p>Cliente</p>
                        <p>Fecha</p>
                        <p>Estado</p>
                        <p></p>
                    </div>
                    <div>
                    {orders.map(order => (
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