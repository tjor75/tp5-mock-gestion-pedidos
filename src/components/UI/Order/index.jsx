import { useState } from "react";
import Modal from "../Modal";
import "./Order.css";

export default function Order({ order }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <tr className="order">
            <td>#{order.id}</td>
            <td>{order.client}</td>
            <td>{new Date(order.date).toLocaleString()}</td>
            <td>{order.status}</td>
            <td>
                <button onClick={() => setOpenModal(true)}>Ver</button>
                <Modal openModal={openModal} onClose={() => setOpenModal(false)} title="Order Details">
                    <div className="order-details">
                        <p><strong>Client:</strong> {order.client}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Product:</strong> {order.product}</p>
                        <p><strong>ID:</strong> {order.id}</p>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}