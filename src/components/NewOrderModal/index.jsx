import { useContext, useEffect, useState } from "react";
import { Status } from "../../constants/status";
import { OrderContext } from "../../contexts/OrderContext";
import { getDateOrNow } from "../../helpers/validation-helper";
import Form from "../UI/Form";
import Modal from "../UI/Modal";
import EditProductList from "../UI/EditProductList";
import IconPlus from "../UI/Icons/IconPlus";

export default function NewOrderModal() {
    const { lastOrderId, setLastOrderId, orders, setOrders } = useContext(OrderContext);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [customer, setCustomer]   = useState("");
    const [date, setDate]           = useState("");
    const [status, setStatus] = useState(Status.PENDING);
    const [valid, setValid] = useState({
        customer: null,
        newProducts: null
    });

    useEffect(() => {
        resetForm();
        setOpen(false);
    }, [orders]);

    const resetForm = () => {
        setProducts([]);
        setLastOrderId(prev => prev + 1);
        setCustomer("");
        setDate("");
        setStatus(Status.PENDING.toString());
        setValid({ customer: null, newProducts: null });
    };

    const handleCustomer = (e) => {
        setValid(oldValid => ({...oldValid, customer: e.target.value.length > 3}));
        setCustomer(e.target.value);
    };

    const checkSomeInvalid = () => {
        let someInvalid = false;
        Object.keys(valid).forEach(validFieldKey => {
            const isNull = valid[validFieldKey] === null;
            if (isNull)
                setValid(oldValid => ({...oldValid, [validFieldKey] : false}));

            someInvalid = someInvalid || !valid[validFieldKey];
        });
        return someInvalid;
    };

    const onSubmit = () => {
        if (checkSomeInvalid()) return;
        
        setOrders(prev => [
            ...prev,
            {
                id: lastOrderId + 1,
                customer,
                date: getDateOrNow(date),
                status: parseInt(status, 10),
                products
            }
        ]);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <IconPlus />
                <span>New Order</span>
            </button>
            <Modal title="New Order" open={open} setOpen={setOpen} onClose={resetForm}>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">
                        <label htmlFor="customer" className="required">Nombre del cliente</label>
                        <input
                            type="text"
                            name="customer"
                            placeholder="Jorge Diaz"
                            value={customer}
                            onChange={handleCustomer}
                        />
                        {valid.customer === false && <p className="error">customer {">"} 3</p>}
                    </div>

                    <div className="w-50">
                        <label htmlFor="date">Fecha</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="w-50">
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
                        elementId="newProducts"
                        valid={valid}
                        setValid={setValid}
                        products={products}
                        setProducts={setProducts}
                    />

                    <button type="submit">Create</button>
                </Form>
            </Modal>
        </>
    );
}