import { useState } from "react";
import Modal from "../Modal";
import "./Order.css";

export default function Order({ order }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="order">
            <div>#{order.id}</div>
            <div>{order.client}</div>
            <div>{new Date(order.date).toLocaleString()}</div>
            <div>{order.status}</div>
            <div>
                <button onClick={() => setOpenModal(true)}>Ver</button>
                <Modal title="Order Details" openModal={openModal} setOpenModal={setOpenModal}>
                    <div className="order-details">
                        <div>
                            <h3>Client</h3>
                            <p>{order.customer}</p>
                        </div>
                        <div>
                            <h3>Date</h3>
                            <p>{new Date(order.date).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <p>{order.status}</p>
                        </div>
                        <div>
                            <h3>Products</h3>
                            {order.products.map(product => (
                                <p key={product.id}>{product.name} - (x{product.quantity})</p>
                            ))}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}