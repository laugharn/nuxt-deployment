process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
            let careers, courses, lps, pages, partners, posts, whitepapers;

            const ultra = await import(corePath +
                "/assets/js/services/ultra/query").then(
                response => response.default
            );

            const sleep = await import(corePath +
                "/assets/js/utils/sleep").then(response => response.default);

            posts = [];

            const getPosts = async (
                page = 0,
                maxNumPages = 1,
                perPage = 20
            ) => {
                if (page < maxNumPages) {
                    let chunk = await ultra({
                        offset: page * perPage,
                        post_type: "post",
                        posts_per_page: perPage
                    });

                    posts = [
                        ...posts,
                        ...chunk.posts.map(post => {
                            return {
                                payload: post,
                                route: "/blog/" + post.post_name + "/"
                            };
                        })
                    ];

                    await sleep(1024);
                    await getPosts(page + 1, chunk.max_num_pages);
                }
            };

            await getPosts();

            await sleep(1024);

            careers = await ultra({
                post_type: "career",
                posts_per_page: -1
            }).then(response =>
                response.posts.map(career => {
                    return {
                        payload: career,
                        route: "/career-center" + career.permalink
                    };
                })
            );

            await sleep(1024);

            courses = await ultra({
                post_type: "course",
                posts_per_page: -1
            }).then(response =>
                response.posts.map(course => {
                    return {
                        payload: course,
                        route: course.permalink
                    };
                })
            );

            await sleep(1024);

            lps = await ultra({
                post_type: "lp",
                posts_per_page: -1
            }).then(response =>
                response.posts.map(lp => {
                    return {
                        payload: lp,
                        route: lp.permalink
                    };
                })
            );

            pages = [];

            const getPages = async (
                page = 0,
                maxNumPages = 1,
                perPage = 20
            ) => {
                if (page < maxNumPages) {
                    let chunk = await ultra({
                        offset: page * perPage,
                        post_type: "page",
                        posts_per_page: perPage
                    });

                    pages = [
                        ...pages,
                        ...chunk.posts.map(post => {
                            return {
                                payload: post,
                                route:
                                    post.post_name == "home"
                                        ? "/"
                                        : post.permalink
                            };
                        })
                    ];

                    await sleep(1024);
                    await getPages(page + 1, chunk.max_num_pages);
                }
            };

            await getPages();

            await sleep(1024);

            partners = await ultra({
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
            );

            await sleep(1024);

            whitepapers = await ultra({
                post_type: "whitepaper",
                posts_per_page: -1
            }).then(response =>
                response.posts.map(post => {
                    return {
                        route: "/whitepapers/" + post.post_name + "/",
                        payload: post
                    };
                })
            );

            return [
                ...posts,
                ...courses,
                ...careers,
                ...lps,
                ...partners,
                ...whitepapers,
                ...pages
            ];
        }
    },

    head: {
        titleTemplate: "%s - AceableAgent"
    },

    hooks: {
        "generate:done": () => {
            console.log(process.env.NOW_URL + " is generated");
        }
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
        compressor: {
            threshold: 5
        },
        http2: {
            push: true,
            shouldPush: (file, type) => ["font", "script"].includes(type)
        },
        static: {
            maxAge: "1y"
        }
    },

    sitemap: {
        generate: true,
        hostname: "https://www.aceableagent.com",
        path: "/sitemap.xml",
        routes: async function() {
            return [
                "/career-center/",
                "/courses/texas/continuing-education/",
                "/courses/texas/pre-license/"
            ];
        }
    }
};
