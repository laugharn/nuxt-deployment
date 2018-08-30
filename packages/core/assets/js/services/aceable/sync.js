import instance from "./instance";

export default async sessionToken => {
    return await instance(sessionToken)
        .get("user/sync")
        .then(response => response.data);
};
