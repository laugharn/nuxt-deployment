<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Prefab
import ListShare from "~/components/prefab/list/share.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton,
        DiyCollection,
        DiyHeading,
        DiyMarkdown,
        DiySpace,

        ListShare
    },

    computed: {
        baseConfig() {
            return {
                buttons: {
                    block: true,
                    buttonExtensionClasses: "btn-primary",
                    id: this.id + "-buttons",
                    slot: "main-footer"
                },

                description: {
                    content:
                        deepGet(
                            this.$store.state.page.content,
                            "seo.description"
                        ) || null,
                    id: this.id + "-description",
                    markdownExtensionClasses: "pb-3",
                    slot: "main-body"
                },

                list: {
                    slot: "main-footer"
                },

                space: {
                    asideExtensionClasses: "d-none",
                    backgroundImageParams:
                        "w=1440&blur=250&bri=-20&auto=compress",
                    backgroundImage:
                        deepGet(this.$store.state.page.content, "image") ||
                        "/uploads/content/k7JdmEL3jlLJVzzaBlCzdDLx9XNl6C9u.jpg",
                    id: this.id + "-space",
                    mainExtensionClasses: "m-auto p-3 text-center",
                    showBackgroundImage: true,
                    wrapperExtensionClasses: "bg-secondary py-3 text-white"
                },

                title: {
                    content: deepGet(
                        this.$store.state.page.content,
                        "spaces.hero.title.content",
                        "seo.title",
                        "post_title"
                    ),
                    id: this.id + "-title",
                    slot: "main-header",
                    type: "h1"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.hero",
            type: String
        },

        id: {
            default: "hero",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <ListShare v-bind="computedConfig.list" />
    </DiySpace>
</template>
