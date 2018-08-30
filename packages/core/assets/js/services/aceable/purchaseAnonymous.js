import instance from "./instance";

export default async form => {
    return await instance()
        .post("purchase-receipt/anonymous", form)
        .then(response => response.data);
};
