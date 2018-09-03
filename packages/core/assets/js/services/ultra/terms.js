import axios from "axios";

export default async params => {
    return await axios
        .get(process.env.ULTRA_API_BASE_URI + "terms", {
            params: params
        })
        .then(response => response.data);
};
