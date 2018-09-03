<script>
// Components
// DIY
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiyQuote from "@core/components/diy/quote.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyMarkdown,
        DiyQuote,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                quote: {
                    content: `The videos take a class I've taken and then even taught in my office and summarize them into about 20 minutes.`,
                    id: this.id + "-quote",
                    slot: "main-body",
                    source: `**Jill,** a Keller Williams Agent`
                },

                space: {
                    asideExtensionClasses: "d-none",
                    backgroundImageParams:
                        "w=1440&blend=000000&balph=67&bm=darken&auto=compress",
                    backgroundImage:
                        deepGet(this.$store.state.page.content, "image") ||
                        "/uploads/sites/3/2018/03/Fotolia_144718558_Subscription_Monthly_M.jpg",
                    id: this.id,
                    mainExtensionClasses: "col-md-8 m-auto p-3 text-center",
                    showBackgroundImage: true,
                    wrapperExtensionClasses: "bg-secondary py-3 text-white"
                },

                stars: {
                    content:
                        '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
                    id: this.id + "-stars",
                    markdownExtensionClasses: "text-warning font-size-lg mb-3",
                    slot: "main-header"
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
            default: "spaces.testimonial",
            type: String
        },

        id: {
            default: "testimonial",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyMarkdown v-bind="computedConfig.stars" />
        <DiyQuote v-bind="computedConfig.quote" />
    </DiySpace>
</template>
