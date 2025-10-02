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
        <div className="order" onClick={() => setOpenModal(true)}>
            <div>
                <p className="mobile">ID</p>
                <p data-label="ID">#{order.id}</p>
            </div>
            <div>
                <p className="mobile">Cliente</p>
                <p data-label="Cliente">{order.customer}</p>
            </div>
            <div>
                <p className="mobile">Fecha</p>
                <p data-label="Fecha">{dateLocaleString}</p>
            </div>
            <div>
                <p className="mobile">Estado</p>
                <p data-label="Estado">{getStatusName(order.status)}</p>
            </div>
            <div className="order-actions">
                <button onClick={(e) => {
                    e.stopPropagation();
                    setOpenModal(true);
                }}>Ver</button>
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

                <button onClick={(e) => {
                    e.stopPropagation();
                    setOrders(prev => prev.filter(o => o.id !== order.id))
                }}>
                    <IconDelete />
                </button>
            </div>
        </div>
    );
}