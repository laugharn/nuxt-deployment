import instance from "./instance";

export default async data => {
    let response = await instance().post("lists/subscribe", data);

    return response.data;
};
