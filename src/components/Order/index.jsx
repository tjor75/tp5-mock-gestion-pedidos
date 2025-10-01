import { useState } from "react";
import Modal from "../UI/Modal";
import ProductList from "../UI/ProductList";
import StatusProgressBar from "../StatusProgressBar";
import "./Order.css";

export default function Order({ order }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="order">
            <p>#{order.id}</p>
            <p>{order.customer}</p>
            <p>{new Date(order.date).toLocaleString()}</p>
            <p>{order.status}</p>
            <div>
                <button onClick={() => setOpenModal(true)}>Ver</button>
                <Modal title={"Orden #" + order.id} open={openModal} setOpen={setOpenModal}>
                    <div className="order-details">
                        <div className="w-50">
                            <h3>Cliente</h3>
                            <p>{order.customer}</p>
                        </div>
                        <div className="w-50">
                            <h3>Fecha</h3>
                            <p>{new Date(order.date).toLocaleString()}</p>
                        </div>
                        <div className="w-100">
                            <h3>Estado</h3>
                            <StatusProgressBar currentStatus={order.status} />
                        </div>
                        <div className="w-100">
                            <h3>Productos</h3>
                            <ProductList products={order.products} />
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}