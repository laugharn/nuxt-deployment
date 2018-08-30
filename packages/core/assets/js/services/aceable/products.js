import instance from "./instance";

export default async params => {
    return await instance()
        .get("product-course", {
            params
        })
        .then(response => response.data);
};
