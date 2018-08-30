import instance from "./instance";

export default async (data, sessionToken) => {
    return await instance(sessionToken)
        .post("purchase-receipt", data)
        .then(response => response.data);
};
