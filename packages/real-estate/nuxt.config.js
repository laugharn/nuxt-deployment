import dotenv from "dotenv";
import path from "path";
import pkg from "./package.json";

const config = dotenv.config({
    path: `./.env.${process.env.ENV_FILE || "local"}`
}).parsed;

const corePath =
    process.env.NODE_ENV == "production" && !process.env.LOCAL
        ? path.resolve(__dirname, "./core/")
        : path.resolve(__dirname, "../core/");

const modulesDirPath =
    process.env.NODE_ENV == "production" && !process.env.LOCAL
        ? path.resolve(__dirname, "./node_modules/")
        : path.resolve(__dirname, "../../node_modules/");

export default {
    build: {
        extend(config) {
            config.resolve.alias["@core"] = corePath;
            config.resolve.alias["@modules"] = modulesDirPath;
            config.resolve.alias["vue"] = "vue/dist/vue.esm";
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
            let careers, courses, pages, partners, posts, whitepapers;

            const ultra = await import(corePath +
                "/assets/js/services/ultra/query").then(
                response => response.default
            );

            [
                careers,
                courses,
                pages,
                partners,
                whitepapers
            ] = await Promise.all([
                await ultra({
                    post_type: "career",
                    posts_per_page: -1
                }).then(response =>
                    response.posts.map(career => {
                        return {
                            payload: career,
                            route: "/career-center" + career.permalink
                        };
                    })
                ),

                await ultra({
                    post_type: "course",
                    posts_per_page: -1
                }).then(response =>
                    response.posts.map(course => {
                        return {
                            payload: course,
                            route: course.permalink
                        };
                    })
                ),

                await ultra({
                    post_type: "page",
                    posts_per_page: -1
                }).then(response =>
                    response.posts.map(page => {
                        return {
                            route:
                                page.post_name == "home" ? "/" : page.permalink,
                            payload: page
                        };
                    })
                ),

                await ultra({
                    post_type: "partner",
                    posts_per_page: -1
                }).then(response =>
                    response.posts.map(partner => {
                        return {
                            payload: partner,
                            route: partner.permalink.replace(
                                "/partners/",
                                "/partner/"
                            )
                        };
                    })
                ),

                await ultra({
                    post_type: "whitepaper",
                    posts_per_page: -1
                }).then(response =>
                    response.posts.map(post => {
                        return {
                            route: "/whitepapers/" + post.post_name + "/",
                            payload: post
                        };
                    })
                )
            ]);

            return [
                ...careers,
                ...courses,
                ...pages,
                ...partners,
                ...whitepapers
            ];
        }
    },

    head: {
        titleTemplate: "%s - AceableAgent"
    },

    icon: {
        iconSrc: corePath + "/assets/img/icon.png"
    },

    modules: [
        modulesDirPath + "/@nuxtjs/icon",
        modulesDirPath + "/@nuxtjs/meta",
        modulesDirPath + "/@nuxtjs/sitemap"
    ],

    plugins: [
        {
            src: corePath + "/plugins/directives.js",
            ssr: false
        },
        {
            src: corePath + "/plugins/gtm.js",
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
    },

    sitemap: {
        generate: true,
        hostname: "https://www.aceableagent.com",
        path: "/sitemap.xml"
    }
};
