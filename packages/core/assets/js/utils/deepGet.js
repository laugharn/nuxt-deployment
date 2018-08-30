import get from "lodash/get";

export default (object, ...args) => {
    let value = undefined;

    args.find(arg => {
        const argValue = get(object, arg, false);

        value = argValue;

        return argValue;
    });

    return value ? value : undefined;
};
