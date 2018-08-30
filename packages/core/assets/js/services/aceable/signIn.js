import instance from "./instance";

export default async form => {
    return await instance()
        .post("user/signin", form)
        .then(response => response.data);
};
