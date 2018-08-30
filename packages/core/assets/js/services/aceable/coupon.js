import instance from "./instance";

export default async code => {
    return await instance()
        .get("coupon", {
            params: {
                code
            }
        })
        .then(response => response.data);
};
