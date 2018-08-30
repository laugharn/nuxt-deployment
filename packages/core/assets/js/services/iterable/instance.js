import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "https://api.iterable.com/api/",
        headers: {
            api_key: process.env.ITERABLE_API_KEY
        }
    });
};
