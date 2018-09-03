<script>
// Components
// DIY
import DiyCard from "@core/components/diy/card.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyLink from "@core/components/diy/link.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

// Libraries
import { DateTime } from "luxon";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyCard,
        DiyImage,
        DiyLink,
        DiyMarkdown
    },

    computed: {
        defaultConfig() {
            return {
                card: {
                    mainBodyExtensionClasses: "mb-2",
                    mainHeaderExtensionClasses: "mb-2"
                },

                description: {
                    content: deepGet(
                        this.cardContent,
                        "card.description",
                        "seo.description",
                        "description"
                    ),
                    markdownExtensionClasses: "mb-3",
                    slot: "main-body"
                },

                image: {
                    backgroundWrapperExtensionClasses: "aspect-ratio-3by1",
                    params: "w=640&auto=compress",
                    slot: "header",
                    src:
                        deepGet(this.cardContent, "card.image", "image") ||
                        "/uploads/content/k7JdmEL3jlLJVzzaBlCzdDLx9XNl6C9u.jpg",
                    type: "background"
                },

                timestamp: {
                    content: DateTime.fromFormat(
                        this.cardContent.post_date,
                        "yyyy-MM-dd H:m:s"
                    ).toFormat("MMMM dd, yyyy"),
                    markdownExtensionClasses: "text-notice",
                    slot: "main-header"
                },

                title: {
                    content: deepGet(
                        this.cardContent,
                        "card.title",
                        "post_title"
                    ),
                    href: this.titleHref,
                    linkExtensionClasses: this.titleLinkExtensionClasses,
                    slot: "main-header"
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "cards.content",
            type: String
        },

        cardContent: {
            default: null,
            type: Object
        },

        hrefPrefix: {
            default: "whitepapers",
            type: String
        },

        titleHref: {
            default() {
                return (
                    "/" +
                    this.hrefPrefix +
                    "/" +
                    this.cardContent.post_name +
                    "/"
                );
            },
            type: String
        },

        titleLinkExtensionClasses: {
            default: "font-size-lg font-weight-bold",
            type: String
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig.card">
        <DiyImage v-bind="computedConfig.image" />
        <DiyLink v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.timestamp" />
        <DiyMarkdown v-bind="computedConfig.description" />
    </DiyCard>
</template>
