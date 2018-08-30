import axios from "axios";

export default (sessionToken = null) => {
    let instance = axios.create({
        baseURL: process.env.ACEABLE_API_BASE_URI,
        headers: {
            Authorization: process.env.ACEABLE_API_AUTHORIZATION
        },
        params: {
            appTypeList: ["DD", "DE", "RE"],
            buildnum: process.env.BUILD_NUM,
            platform: "MKT"
        }
    });

    if (sessionToken) {
        instance.defaults.headers["X-Aceable-Session"] = sessionToken;
    }

    return instance;
};
