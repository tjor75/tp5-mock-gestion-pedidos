export const validateStringMoreThan = (str, minLength, defaultValue) => {
    const trim = str.trim();
    return trim.length >= minLength ? trim : defaultValue;
};

export const validateQuantity = (quantity, defaultValue) => {
    return Number.isInteger(quantity) && quantity > 0 ? quantity : defaultValue;
};

export const getDateOrNow = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return !isNaN(date.valueOf()) && date >= now ? date : now;
};

export const validateFloat = (value, defaultValue) => {
    const parsedFloat = parseFloat(value);
    return !isNaN(parsedFloat) && parsedFloat >= 0 ? parsedFloat : defaultValue;
};

export const validatePositiveFloat = (value, defaultValue) => {
    const parsedFloat = parseFloat(value);
    return !isNaN(parsedFloat) && parsedFloat >= 0 ? parsedFloat : defaultValue;
};




/*
    quantity > 0
    customer mínimo 3 caracteres
    status por defecto: pending
    date por defecto: fecha actual
    */