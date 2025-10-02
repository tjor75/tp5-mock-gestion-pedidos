import { useContext, useEffect, useState } from "react";
import { Status } from "../../constants/status";
import { getStatusName } from "../../helpers/enum-helper";
import { checkAllProductsValid, getDateOrNow } from "../../helpers/validation-helper";
import { OrderContext } from "../../contexts/OrderContext";
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
    };

    /*const checkSomeInvalid = () => {
        let someInvalid = false;
        Object.keys(valid).forEach(validFieldKey => {
            const isNull = valid[validFieldKey] === null;
            if (isNull)
                setValid(oldValid => ({...oldValid, [validFieldKey] : false}));

            someInvalid = someInvalid || !valid[validFieldKey];
        });
        return someInvalid;
    };*/

    const onSubmit = () => {
        if (customer.length < 3 || (products.length > 0 && !checkAllProductsValid(products))) return;
        
        setOrders(prev => [
            ...prev,
            {
                id: lastOrderId + 1,
                customer,
                date: getDateOrNow(date),
                status: Number(status),
                products: products.map(product => ({
                    name: product.name,
                    quantity: Number(product.quantity),
                    price: Number(product.price)
                }))
            }
        ]);
    };

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <IconPlus />
                <span>Nueva órden</span>
            </button>
            <Modal title="Nueva órden" open={open} setOpen={setOpen} onClose={resetForm}>
                <Form onSubmit={onSubmit}>
                    <div className="w-100">
                        <label htmlFor="customer" className="required">Nombre del cliente</label>
                        <input
                            type="text"
                            name="customer"
                            placeholder="Jorge Diaz"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                        {!(customer === "" && customer.length < 3) && (
                            <p className="error">Mínimo 3 caracteres</p>
                        )}
                    </div>

                    <div className="w-50">
                        <label htmlFor="date">Fecha</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <p className="note">Por defecto: fecha actual</p>
                    </div>

                    <div className="w-50">
                        <label htmlFor="status">Estado</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={Status.PENDING}>{getStatusName(Status.PENDING)}</option>
                            <option value={Status.SHIPPED}>{getStatusName(Status.SHIPPED)}</option>
                            <option value={Status.DELIVERED}>{getStatusName(Status.DELIVERED)}</option>
                        </select>
                    </div>

                    <EditProductList
                        elementId="newProducts"
                        products={products}
                        setProducts={setProducts}
                    />

                    <button type="submit">Create</button>
                </Form>
            </Modal>
        </>
    );
}