import { ProductFields } from "../../../constants/product-fields";
import {
    checkAllProductsValid,
    checkStringMoreThan,
    checkPositiveInteger,
    checkPositiveZeroFloat
} from "../../../helpers/validation-helper";
import IconDelete from "../Icons/IconDelete";
import "./EditProductList.css";

export default function EditProductList({ products, setProducts }) {    
    const addProduct = (e) => {
        e.preventDefault();
        if (products.length > 0 && !checkAllProductsValid(products)) return;
        const newProducts = [
            ...products,
            { name: '', quantity: '', price: '' }
        ];
        setProducts(newProducts);
    };

    const modifyItem = (index, field, rawValue) => {
        const updatedProducts = [...products];
        
        switch (field) {
            case ProductFields.NAME: {
                updatedProducts[index].name = rawValue;
                break;
            }
            case ProductFields.QUANTITY: {
                updatedProducts[index].quantity = rawValue;
                break;
            }
            case ProductFields.PRICE: {
                updatedProducts[index].price = rawValue;
                break;
            }
        }
        
        setProducts(updatedProducts);
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
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        checkAllProductsValid(updatedProducts);
    }

    return (
        <div className="edit-product-list">
            <div className="space-between">
                <h3 className="required">Products</h3>
                <button className="secondary" onClick={addProduct}>&#65291; Agregar</button>
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
                                {!(item.name === "" || checkStringMoreThan(item.name, 3)) && (
                                    <p className="error">nombre mínimo 3 caracteres</p>
                                )}
                            </td>
                            <td>
                                <span>x</span>
                                <input
                                    type="number"
                                    placeholder="Cantidad"
                                    value={item.quantity}
                                    onChange={e => modifyItem(index, ProductFields.QUANTITY, e.target.value)}
                                    step="0.01"
                                />
                                {!(item.quantity === "" || checkPositiveInteger(item.quantity)) && (
                                    <p className="error">Cantidad debe ser un número entero mayor a 0</p>
                                )}
                            </td>
                            <td>
                                <span>$</span>
                                <input
                                    type="number"
                                    placeholder="Precio"
                                    value={item.price}
                                    onChange={e => modifyItem(index, ProductFields.PRICE, e.target.value)}
                                    step="0.01"
                                />
                                {!(item.price === "" || checkPositiveZeroFloat(item.price)) && (
                                    <p className="error">Precio debe ser un número mayor a 0</p>
                                )}
                            </td>
                            <td>
                                <button onClick={() => removeItem(index)}>
                                    <IconDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Agregue un producto</p>
            )}
        </div>
    );
}