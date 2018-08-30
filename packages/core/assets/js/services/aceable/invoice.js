import instance from "./instance";

export default async params => {
    return await instance()
        .get("purchase-receipt/price", {
            params
        })
        .then(response => response.data);
};
