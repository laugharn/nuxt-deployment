import instance from "./instance";

export default async obj => {
    return await instance()
        .post("user/password", obj)
        .then(response => response.data);
};
