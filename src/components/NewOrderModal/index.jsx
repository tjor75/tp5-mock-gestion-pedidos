import { useContext, useEffect, useState } from "react";
import { Status } from "../../constants/status";
import { OrderContext } from "../../contexts/OrderContext";
import { getDateOrNow } from "../../helpers/validation-helper";
import Form from "../UI/Form";
import Modal from "../UI/Modal";
import EditProductList from "../UI/EditProductList";

export default function NewOrderModal() {
    const { lastOrderId, setLastOrderId, setOrders } = useContext(OrderContext);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [cantPost, setCantPost] = useState(false);

    const onSubmit = (e) => {
        if (cantPost) return;
        
        setOrders(prev => [
            ...prev,
            {
                id: lastOrderId + 1,
                name: e.target.name.value,
                date: getDateOrNow(e.target.date.value),
                status: e.target.status.value
            }
        ]);
        setProducts([]);
        setLastOrderId(prev => prev + 1);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>New Order</button>
            <Modal title="New Order" open={open} setOpen={setOpen}>
                <Form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" placeholder="Jorge Diaz" />

                        <label htmlFor="date">Fecha</label>
                        <input type="datetime-local" name="date" />

                        <label htmlFor="status">Estado</label>
                        <select name="status">
                            <option value={Status.PENDING}>Pending</option>
                            <option value={Status.SHIPPED}>Shipped</option>
                            <option value={Status.DELIVERED}>Delivered</option>
                        </select>
                    </div>
                    <EditProductList setCantPost={setCantPost} products={products} setProducts={setProducts} />
                    <button type="submit">Create</button>
                </Form>
            </Modal>
        </>
    );
}