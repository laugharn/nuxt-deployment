<script>
// Components
// DIY
import DiyQuote from "@core/components/diy/quote.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyQuote,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                quote: merge(
                    {
                        content: this.quoteContent,
                        slot: this.quoteSlot,
                        source: this.quoteSource
                    },
                    this.quote
                ),

                space: merge(
                    {
                        asideExtensionClasses: this.spaceAsideExtensionClasses,
                        id: this.id + "-space",
                        mainExtensionClasses: this.spaceMainExtensionClasses,
                        show: this.spaceShow,
                        wrapperExtensionClasses: this
                            .spaceWrapperExtensionClasses
                    },
                    this.space
                )
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.testimonial",
            type: String
        },

        id: {
            default: "testimonial",
            type: String
        },

        quote: {
            default: null,
            type: Object
        },

        quoteContent: {
            default: null,
            type: String
        },

        quoteSlot: {
            default: "main-body",
            type: String
        },

        quoteSource: {
            default: null,
            type: String
        },

        space: {
            default: null,
            type: Object
        },

        spaceAsideExtensionClasses: {
            default: "d-none",
            type: String
        },

        spaceMainExtensionClasses: {
            default: "col-md-8 m-auto p-3 text-center",
            type: String
        },

        spaceShow: {
            default: true,
            type: Boolean
        },

        spaceWrapperExtensionClasses: {
            default: "bg-brand-to-success py-3 text-white",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyQuote v-bind="computedConfig.quote" />
    </DiySpace>
</template>
