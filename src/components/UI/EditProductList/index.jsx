import { ProductFields } from "../../../constants/product-fields";
import { validateStringMoreThan, validateQuantity, validatePositiveFloat } from "../../../helpers/validation-helper";
import "./EditProductList.css";

export default function EditProductList({ elementId, valid, setValid, products, setProducts }) {
    const checkAllProductsValid = () => {
        const invalid = products.some(p => p.name && p.quantity && p.price);
        setValid((oldValid) => ({...oldValid, [elementId]: invalid}));
        return invalid;
    };

    const addProduct = (e) => {
        e.preventDefault();
        if (products.length > 0 && !checkAllProductsValid()) return;
        setProducts(oldProducts => [
            ...oldProducts,
            { name: undefined, quantity: undefined, price: undefined }
        ]);
    };

    const modifyItem = (index, field, rawValue) => {
        setProducts(oldProducts => {
            const products = [...oldProducts];

            switch (field) {
                case ProductFields.NAME:
                    products[index].name = validateStringMoreThan(rawValue, 3, null);
                    break;
                case ProductFields.QUANTITY:
                    products[index].quantity = validateQuantity(rawValue, null);
                    break;
                case ProductFields.PRICE:
                    products[index].price = validatePositiveFloat(rawValue, null);
                    break;
            }

            return products;
        });
    }

    /*const modifyItem = (index, field, rawValue) => {
        setProducts(old => {
            const copy = [...old];
            const value = (field === "quantity" || field === "price") ? rawValue : rawValue;
            copy[index] = { ...copy[index], [field]: value };
            updateValidity(copy);
            return copy;
        });
    }*/

    const removeItem = (index) => {
        setProducts(oldProducts => oldProducts.filter((_, i) => i !== index));
    }

    return (
        <div id={elementId} className="edit-product-list">
            <div className="space-between">
                <h3>Products</h3>
                <button onClick={addProduct}>&#65291; Agregar</button>
            </div>
            {products.length !== 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((item, index) => (
                        <tr key={index} className="edit-product-list-item" onChange={modifyItem}>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={item.name}
                                    onChange={e => modifyItem(index, ProductFields.NAME, e.target.value)}
                                />
                                {item.name === null && <p className="error">customer mínimo 3 caracteres</p>}
                            </td>
                            <td>
                                x
                                <input
                                    type="number"
                                    placeholder="Cantidad"
                                    value={item.quantity}
                                    onChange={e => modifyItem(index, ProductFields.QUANTITY, e.target.value)}
                                    step="0.01"
                                />
                                {item.quantity === null && <p className="error">quantity &gt; 0</p>}
                            </td>
                            <td>
                                $
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={item.price}
                                    onChange={e => modifyItem(index, ProductFields.PRICE, e.target.value)}
                                    step="0.01"
                                />
                                {item.price === null && <p className="error">price &gt;= 0</p>}
                            </td>
                            <td>
                                <button onClick={() => removeItem(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className={valid[elementId] === false ? "error" : ""}>Agregue un producto</p>
            )}
        </div>
    );
}