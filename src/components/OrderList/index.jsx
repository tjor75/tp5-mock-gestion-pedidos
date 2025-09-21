import { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Order from "../UI/Order";
import "./OrderList.css";

export default function OrderList() {
    const { orders } = useContext(OrderContext);

    return (
        <div className="order-list">
            {orders.length !== 0 ? (
                orders.map(order => (
                    <Order key={order.id} order={order} />
                ))
            ) : (
                <div className="order-list-empty">
                    <p>No orders available</p>
                </div>
            )}
        </div>
    );
}