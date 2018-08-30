<script>
import deepGet from "../assets/js/utils/deepGet";
import get from "lodash/get";
import imageBuilder from "../assets/js/services/builders/image";

export default {
    computed: {
        component() {
            if (this.$store.state.page.template !== null) {
                let [type, modifier] = this.$store.state.page.template.split(
                    "--"
                );

                return () =>
                    import("~/templates/" + type + "/" + modifier + ".vue");
            }

            return "nuxt";
        }
    },

    head() {
        return {
            ...this.$nuxt.$options.head,
            ...{
                link: [
                    {
                        hid: "pyramid_canonical",
                        href:
                            process.env.PROTOCOL +
                            process.env.PRODUCTION_URL +
                            (deepGet(
                                this.$store.state.page.content,
                                "seo.canonical"
                            ) || this.$route.path),
                        rel: "canonical"
                    }
                ],

                meta: [
                    {
                        hid: "edge",
                        "http-equiv": "X-UA-Compatible",
                        content: "IE=edge"
                    },
                    {
                        hid: "robots",
                        name: "robots",
                        content:
                            (process.env.STACKPATH_URL
                                ? deepGet(
                                      this.$store.state.page.content,
                                      "seo.index"
                                  )
                                    ? "index"
                                    : "noindex"
                                : "noindex") +
                            ", " +
                            (process.env.STACKPATH_URL
                                ? depGet(
                                      this.$store.state.page.content,
                                      "seo.follow"
                                  )
                                    ? "follow"
                                    : "nofollow"
                                : "nofollow")
                    },
                    {
                        hid: "og:description",
                        name: "og:description",
                        content: deepGet(
                            this.$store.state.page.content,
                            "open_graph.description",
                            "spaces.hero.description.content",
                            "seo.description"
                        )
                    },
                    {
                        hid: "og:image",
                        name: "og:image",
                        content: imageBuilder(
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.image",
                                "image"
                            )
                        )
                    },
                    {
                        hid: "og:locale",
                        name: "og:locale",
                        content:
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.locale"
                            ) || "en_US"
                    },
                    {
                        hid: "og:site_name",
                        name: "og:site_name",
                        content:
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.site_name"
                            ) || "Aceable"
                    },
                    {
                        hid: "og:type",
                        name: "og:type",
                        content:
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.type"
                            ) || "article"
                    },
                    {
                        hid: "og:title",
                        name: "og:title",
                        content: deepGet(
                            this.$store.state.page.content,
                            "open_graph.title",
                            "spaces.hero.title.content",
                            "seo.title",
                            "post_title"
                        )
                    },
                    {
                        hid: "twitter:card",
                        name: "twitter:card",
                        content:
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.twitter.card"
                            ) || "summary"
                    },
                    {
                        hid: "twitter:image",
                        name: "twitter:image",
                        content: imageBuilder(
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.twitter.image",
                                "open_graph.image",
                                "image"
                            )
                        )
                    },
                    {
                        hid: "twitter:site",
                        name: "twitter:site",
                        content:
                            deepGet(
                                this.$store.state.page.content,
                                "open_graph.twitter.card"
                            ) || process.env.TWITTER_SITE
                    }
                ],

                script: [
                    this.$store.state.page.content !== null &&
                    this.$store.state.page.content.optimizely == true
                        ? {
                              hid: "optimizely",
                              src: "//cdn.optimizely.com/js/2605830644.js",
                              type: "text/javascript"
                          }
                        : {}
                ],

                title: () => {
                    const title = deepGet(
                        this.$store.state.page.content,
                        "seo.title",
                        "post_title"
                    );

                    return (
                        (process.env.NODE_ENV == "local" ? "LOCAL " : "") +
                        title
                    );
                }
            }
        };
    }
};
</script>

<template>
    <component :is="component"></component>
</template>
