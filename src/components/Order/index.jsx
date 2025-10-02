import { useContext, useState } from "react";
import { getStatusName } from "../../helpers/enum-helper";
import { OrderContext } from "../../contexts/OrderContext";
import Modal from "../UI/Modal";
import ProductList from "../UI/ProductList";
import IconDelete from "../UI/Icons/IconDelete";
import StatusProgressBar from "../StatusProgressBar";
import "./Order.css";

export default function Order({ order }) {
    const { setOrders } = useContext(OrderContext);
    const [openModal, setOpenModal] = useState(false);
    const dateLocaleString = new Date(order.date).toLocaleString();

    return (
        <div className="order">
            <p>#{order.id}</p>
            <p>{order.customer}</p>
            <p>{dateLocaleString}</p>
            <p>{getStatusName(order.status)}</p>
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
                            <p>{dateLocaleString}</p>
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

                <button onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}>
                    <IconDelete />
                </button>
            </div>
        </div>
    );
}