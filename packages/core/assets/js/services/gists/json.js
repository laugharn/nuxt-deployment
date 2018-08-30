import axios from "axios";

export default async id => {
    let instance = axios.create({
        baseURL: "https://api.github.com/gists/"
    });

    let gist = await instance.get(id).then(response => response.data);
    let file = gist.files[Object.keys(gist.files)[0]];

    if (file.language !== "JSON") {
        throw "Invalid Language";
    }

    return JSON.parse(file.content);
};
