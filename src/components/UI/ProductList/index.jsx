export default function ProductList({ products }) {
    return (
        <table className="product-list">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>x{product.quantity}</td>
                        <td>${product.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}