import path from "path";

const corePath =
    process.env.NODE_ENV == "production"
        ? path.resolve(__dirname, "./core/")
        : path.resolve(__dirname, "../core/");

const modulesDirPath =
    process.env.NODE_ENV == "production"
        ? path.resolve(__dirname, "./node_modules/")
        : path.resolve(__dirname, "../../node_modules/");

export default {
    build: {
        extend(config) {
            config.resolve.alias["@core"] = corePath;
            config.resolve.alias["@modules"] = modulesDirPath;
        }
    }
};
