import { useEffect, useState } from "react";
import { OrderContext } from "./contexts/OrderContext";
import {
    getLastOrderIdFromLocalStorage,
    getOrdersFromLocalStorage,
    saveLastOrderIdToLocalStorage,
    saveOrdersToLocalStorage
} from "./utils/localStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderList from "./components/OrderList";
import "./App.css";

export default function App() {
    const [lastOrderId, setLastOrderId] = useState(getLastOrderIdFromLocalStorage());
    const [orders, setOrders] = useState(getOrdersFromLocalStorage());

    useEffect(() => {
        saveLastOrderIdToLocalStorage(lastOrderId);
        saveOrdersToLocalStorage(orders);
    }, [lastOrderId]);
    
    return (
        <OrderContext.Provider value={{ lastOrderId, setLastOrderId, orders, setOrders }}>
            <Header />
            <main>
                <div className="order-controls">
                </div>
                <OrderList />
            </main>
            <Footer />
        </OrderContext.Provider>
    );
}