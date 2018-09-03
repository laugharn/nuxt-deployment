<script>
// Components
import DiyImage from "@core/components/diy/image.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyLink from "@core/components/diy/link.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyImage,
        DiyLink,
        DiyMarkdown,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                avatar: {
                    imageExtensionClasses: "rounded-circle",
                    remote: true,
                    slot: "main-header",
                    src: this.$store.state.page.content.user.avatar
                },

                description: {
                    content: this.$store.state.page.content.user.description,
                    slot: "main-footer",
                    show: Boolean(
                        this.$store.state.page.content.user.description
                    )
                },

                displayName: {
                    content: this.$store.state.page.content.user.display_name,
                    slot: "main-header",
                    type: "h5"
                },

                link: {
                    content: "@" + this.$store.state.page.content.user.twitter,
                    href:
                        "https://twitter.com/" +
                        this.$store.state.page.content.user.twitter,
                    show: Boolean(this.$store.state.page.content.user.twitter),
                    slot: "main-header"
                },

                space: {
                    asideExtensionClasses: "d-none",
                    mainClasses: "col-12 p-3",
                    mainFooterExtensionClasses: "text-center",
                    mainHeaderExtensionClasses:
                        "align-items-center d-flex flex-column justify-content-center pb-3",
                    wrapperExtensionClasses: "bg-light py-3"
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
            default: "spaces.user",
            type: String
        },

        id: {
            default: "user",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyImage v-bind="computedConfig.avatar" />
        <DiyHeading v-bind="computedConfig.displayName" />
        <DiyLink v-bind="computedConfig.link" />
        <DiyMarkdown v-bind="computedConfig.description" />
    </DiySpace>
</template>
