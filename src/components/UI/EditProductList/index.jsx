import { ProductFields } from "../../../constants/product-fields";
import { validateStringMoreThan, validateQuantity, validatePositiveFloat } from "../../../helpers/validation-helper";
import "./EditProductList.css";

export default function EditProductList({ elementId, valid, setValid, products, setProducts }) {    
    const validateProduct = (product) => {
        const isNameValid = product.name !== undefined && product.name !== '' && product.name.length >= 3;
        
        // Check if quantity is an integer and > 0
        const quantityNum = Number(product.quantity);
        const isQuantityValid = Number.isInteger(quantityNum) && quantityNum > 0;
        
        // Check if price is a valid number and >= 0
        const priceNum = Number(product.price);
        const isPriceValid = !isNaN(priceNum) && priceNum >= 0;
        
        return {
            name: isNameValid,
            quantity: isQuantityValid,
            price: isPriceValid
        };
    };

    const updateValidity = (products) => {
        const itemsValidity = products.map(product => validateProduct(product));
        const allValid = itemsValidity.every(item => item.name && item.quantity && item.price);
        setValid((oldValid) => ({
            ...oldValid,
            [elementId]: allValid,
            // [`${elementId}_items`]: itemsValidity
        }));
        return allValid;
    };

    const checkAllProductsValid = () => {
        return updateValidity(products);
    };

    const addProduct = (e) => {
        e.preventDefault();
        if (products.length > 0 && !checkAllProductsValid()) return;
        const newProducts = [
            ...products,
            { name: '', quantity: '', price: '' }
        ];
        setProducts(newProducts);
        updateValidity(newProducts);
    };

    const modifyItem = (index, field, rawValue) => {
        const updatedProducts = [...products];
        
        // Ensure we have an object at the current index
        updatedProducts[index] = updatedProducts[index] || {};

        switch (field) {
            case ProductFields.NAME: {
                // Directly set the value - we'll validate it in validateProduct
                updatedProducts[index].name = rawValue || '';
                break;
            }
            case ProductFields.QUANTITY: {
                const validated = validateQuantity(rawValue, null);
                updatedProducts[index].quantity = validated === null ? '' : validated;
                break;
            }
            case ProductFields.PRICE: {
                const validated = validatePositiveFloat(rawValue, null);
                updatedProducts[index].price = validated === null ? '' : validated;
                break;
            }
        }

        setProducts(updatedProducts);
        updateValidity(updatedProducts);
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
        updateValidity(updatedProducts);
    }

    return (
        <div id={elementId} className="edit-product-list">
            <div className="space-between">
                <h3 className="required">Products</h3>
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
                                {item.name !== undefined && item.name !== '' && item.name.length < 3 && (
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
                                {item.quantity !== undefined && item.quantity !== '' && 
                                    (!Number.isInteger(Number(item.quantity)) || Number(item.quantity) <= 0) && (
                                    <p className="error">Quantity must be a whole number greater than 0</p>
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
                                {item.price !== undefined && item.price !== '' && 
                                    (isNaN(Number(item.price)) || Number(item.price) < 0) && (
                                    <p className="error">Price must be a number greater than or equal to 0</p>
                                )}
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