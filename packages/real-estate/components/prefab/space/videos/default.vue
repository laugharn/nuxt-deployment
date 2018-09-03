<script>
// Components
// DIY
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyItem from "@core/components/diy/item.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";
import DiyYoutube from "@core/components/diy/youtube.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyCollection,
        DiyHeading,
        DiyItem,
        DiyMarkdown,
        DiySpace,
        DiyYoutube
    },

    computed: {
        defaultConfig() {
            return {
                space: {
                    wrapperExtensionClasses: "bg-light py-3"
                },
                title: {
                    content:
                        "Have questions about becoming a real estate agent?",
                    headingExtensionClasses: "mb-3",
                    slot: "body-header"
                },
                videos: {
                    items:
                        deepGet(
                            this.$store.state.page.content,
                            "spaces.videos.items",
                            "product.videos"
                        ) || [],
                    slot: "body-footer"
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.videos",
            type: String
        },

        id: {
            default: "videos"
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyCollection v-bind="computedConfig.videos">
            <DiyItem slot-scope="item">
                <DiyYoutube
                    :config="{
                        src: item.src,
                        wrapperExtensionClasses: 'mb-3'
                    }"
                    v-if="item.src"
                />
                <DiyMarkdown
                    :config="{
                        content: item.title,
                        markdownExtensionClasses: 'font-size-lg font-weight-bold mb-3'
                    }"
                    v-if="item.title"
                />
            </DiyItem>
        </DiyCollection>
    </DiySpace>
</template>
