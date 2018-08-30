const removeEmpty = obj => {
    if (obj == null || obj == undefined) {
        return null;
    }

    Object.entries(obj).forEach(
        ([key, val]) =>
            (val && typeof val === "object" && removeEmpty(val)) ||
            ((val === null || val === "") && delete obj[key])
    );

    return obj;
};

export default removeEmpty;
