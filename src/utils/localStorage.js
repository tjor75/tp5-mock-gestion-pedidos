const getFromLocalStorage = (key, defaultValue, callbackFn) => {
    let value = defaultValue;
    try {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null)
            value = callbackFn(savedValue);
    } catch (error) {
        console.error(`Can't parse ${key} from localStorage. Resetting to default value`);
    }
    return value;
};

const saveFromLocalStorage = (key, callbackFn) => {
    try {
        localStorage.saveItem(key, callbackFn());
    } catch (error) {
        console.error(`Can't parse ${key} from localStorage. Resetting to default value`, );
    }
};


export const getLastOrderIdFromLocalStorage = () => {
    return getFromLocalStorage("lastOrderId", 0, (savedLastOrderId) => parseInt(savedLastOrderId, 10));
};

export const getOrdersFromLocalStorage = () => {
    return getFromLocalStorage("orders", [], (savedOrders) => (
        JSON.parse(savedOrders).map(order => ({
            ...order,
            date: new Date(order.date)
        }))
    ));
};


export const saveLastOrderIdToLocalStorage = (lastOrderId) => {
    saveFromLocalStorage("lastOrderId", 0, () => lastOrderId);
};

export const saveOrdersToLocalStorage = (orders) => {
    saveFromLocalStorage("orders", [], () => (
        JSON.stringify(orders.map(order => ({
            ...order,
            date: new Date(order.date)
        })))
    ));
};