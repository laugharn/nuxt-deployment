import instance from "./instance";

export default async form => {
    return await instance()
        .post("user", form)
        .then(response => response.data);
};
