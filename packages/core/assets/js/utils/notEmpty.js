import deepFilter from "deep-filter";

const notEmpty = (value, prop, subject) => {
    var key;

    if (Array.isArray(value)) {
        return value.length > 0;
    } else if (
        !!value &&
        typeof value === "object" &&
        value.constructor === Object
    ) {
        for (key in value) {
            return true;
        }

        return false;
    } else if (typeof value === "string") {
        return value.length > 0;
    } else {
        return value != null;
    }
};

export default obj => deepFilter(obj, notEmpty);
