import { useContext, useState } from "react";
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
    const [client, setClient]   = useState("");
    const [date, setDate]       = useState("");
    const [status, setStatus]   = useState("");

    const onSubmit = (e) => {
        if (cantPost) return;
        
        setOrders(prev => [
            ...prev,
            {
                id: lastOrderId + 1,
                client: e.target.client.value,
                date: getDateOrNow(e.target.date.value),
                status: e.target.status.value
            }
        ]);
        setProducts([]);
        setLastOrderId(prev => prev + 1);
        setClient(""); setDate(""); setStatus("");
        setOpen(false);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>New Order</button>
            <Modal title="New Order" open={open} setOpen={setOpen}>
                <Form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="client">Nombre del cliente</label>
                        <input
                            type="text"
                            name="client"
                            placeholder="Jorge Diaz"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                        />

                        <label htmlFor="date">Fecha</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <label htmlFor="status">Estado</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={Status.PENDING}>Pending</option>
                            <option value={Status.SHIPPED}>Shipped</option>
                            <option value={Status.DELIVERED}>Delivered</option>
                        </select>
                    </div>
                    <EditProductList
                        setCantPost={setCantPost}
                        products={products}
                        setProducts={setProducts}
                    />
                    <button type="submit">Create</button>
                </Form>
            </Modal>
        </>
    );
}