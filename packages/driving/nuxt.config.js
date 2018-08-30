import dotenv from "dotenv";
import path from "path";
import pkg from "./package.json";

const config = dotenv.config({
    path: `./.env.${process.env.ENV_FILE || "local"}`
}).parsed;

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
        },

        optimization: {
            splitChunks: {
                name: true
            }
        }
    },

    css: [
        {
            lang: "scss",
            src: corePath + "/assets/sass/style.scss"
        }
    ],

    env: {
        BUILD_NUM: pkg.version,
        ENV_FILE: process.env.ENV_FILE,
        ...config
    },

    generate: {
        routes: async function() {
            const ultra = await import(corePath +
                "/assets/js/services/ultra/query").then(
                response => response.default
            );

            let pages = await ultra({
                post_type: "page",
                posts_per_page: -1
            }).then(response =>
                response.posts.map(page => {
                    return {
                        route: page.post_name == "home" ? "/" : page.permalink,
                        payload: page
                    };
                })
            );

            return [...pages];
        }
    },

    head: {
        titleTemplate: "%s - Aceable"
    },

    icon: {
        iconSrc: corePath + "/assets/img/icon.png"
    },

    modules: [
        modulesDirPath + "/@nuxtjs/icon",
        modulesDirPath + "/@nuxtjs/meta"
    ],

    plugins: [
        {
            src: corePath + "/plugins/directives.js",
            ssr: false
        },
        {
            src: corePath + "/plugins/storage.js",
            ssr: false
        }
    ],

    render: {
        gzip: {
            threshold: 5
        },
        http2: {
            push: true
        },
        maxAge: 360000
    }
};
