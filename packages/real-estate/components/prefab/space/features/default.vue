<script>
// Components
// DIY
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyItem from "@core/components/diy/item.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyCollection,
        DiyHeading,
        DiyItem,
        DiyMarkdown,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                features: {
                    id: this.id + "-features",
                    slot: "body-footer"
                },

                space: {
                    id: this.id,
                    wrapperExtensionClasses:
                        "bg-brand-to-success py-3 text-white"
                },

                title: {
                    content: "Features you&#39;ll love",
                    headingExtensionClasses: "mb-3",
                    id: this.id + "-title",
                    slot: "body-header"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    name: "SpaceFeatures",

    props: {
        configKey: {
            default: "spaces.features",
            type: String
        },

        id: {
            default: "features",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyCollection v-bind="computedConfig.features">
            <DiyItem slot-scope="item">
                <DiyMarkdown
                    markdown-extension-classes="font-size-lg font-weight-bold mb-3"
                    :content="item.title"
                    v-if="item.title"
                />

                <DiyMarkdown
                    :content="item.description"
                />
            </DiyItem>
        </DiyCollection>
    </DiySpace>
</template>
