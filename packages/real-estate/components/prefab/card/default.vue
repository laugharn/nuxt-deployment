<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyHeading
    },

    computed: {
        baseConfig() {
            return {
                canLink: this.canLink,
                title: {
                    content: deepGet(
                        this.cardContent,
                        "card.title",
                        "post_title"
                    ),
                    slot: "main-header",
                    type: "h5"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    props: {
        canLink: {
            default: true,
            type: Boolean
        },

        configKey: {
            default: "card.default",
            type: String
        },

        cardContent: {
            default: null,
            type: Object
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig.card">
        <DiyHeading v-bind="computedConfig.title" />
    </DiyCard>
</template>
