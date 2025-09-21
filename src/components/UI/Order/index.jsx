import { useState } from "react";
import Modal from "../Modal";

export default function Order({ order }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="order">
            <div className="order-basic-info">
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Client:</strong> {order.client}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
            </div>
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
        </div>
    );
}