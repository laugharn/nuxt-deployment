import axios from "axios";

export default async () => {
    return await axios
        .get(process.env.ULTRA_API_BASE_URI + "generate")
        .then(response => response.data);
};
