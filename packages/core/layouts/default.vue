<script>
// Libraries
import get from "lodash/get";

// Utils
import deepGet from "../assets/js/utils/deepGet";
import imageBuilder from "../assets/js/services/builders/image";

export default {
    computed: {
        templateComponent() {
            let [type, modifier] = (this.$store.state.page.template !== null
                ? this.$store.state.page.template
                : "error--default"
            ).split("--");

            return import("~/templates/" + type + "/" + modifier + ".vue");
        }
    },

    data() {
        return {
            template: () => ({
                component: this.templateComponent
            })
        };
    },

    head() {
        return {
            ...this.$nuxt.$options.head,
            ...{
                link: [
                    {
                        hid: "pyramid_canonical",
                        href:
                            "https://" +
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
                        content: "noindex,nofollow"
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
                        content: get(
                            this.$store.state.page.content,
                            "open_graph.locale",
                            "en_US"
                        )
                    },
                    {
                        hid: "og:site_name",
                        name: "og:site_name",
                        content: get(
                            this.$store.state.page.content,
                            "open_graph.site_name",
                            process.env.SITE_NAME
                        )
                    },
                    {
                        hid: "og:type",
                        name: "og:type",
                        content: get(
                            this.$store.state.page.content,
                            "open_graph.type",
                            "article"
                        )
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
                        content: get(
                            this.$store.state.page.content,
                            "open_graph.twitter.card",
                            "summary"
                        )
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
                        content: get(
                            this.$store.state.page.content,
                            "open_graph.twitter.card",
                            process.env.TWITTER_SITE
                        )
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
                        (process.env.NODE_ENV == "production" ? "" : "LOCAL ") +
                        title
                    );
                }
            }
        };
    },

    mounted() {
        this.$store.commit("mutateUpdatedAt", new Date());
    }
};
</script>

<template>
    <component :is="template"></component>
</template>
