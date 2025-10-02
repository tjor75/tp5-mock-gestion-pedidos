export const checkStringMoreThan = (str, minLength) => {
    const trim = str.trim();
    return trim.length >= minLength;
};

export const getDateOrNow = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return !isNaN(date.valueOf()) ? date : now;
};

export const checkPositiveInteger = (value) => {
    const parsedNumber = Number(value);
    return Number.isInteger(parsedNumber) && parsedNumber > 0;
};

export const checkPositiveZeroFloat = (value) => {
    const parsedNumber = Number(value);
    return !isNaN(parsedNumber) && parsedNumber >= 0;
};



const checkProduct = (product) => {
    return (
        checkStringMoreThan(product.name, 3) &&
        checkPositiveInteger(product.quantity) &&
        checkPositiveZeroFloat(product.price)
    );
};

export const checkAllProductsValid = (products) => {
    return products.every(product => checkProduct(product));
};