<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";
import DiyQuote from "@core/components/diy/quote.vue";
import DiyYoutube from "@core/components/diy/youtube.vue";

// Prefab
import callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyImage,
        DiyQuote,
        DiyYoutube
    },

    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                quote: {
                    content:
                        "Do you want to just pass the test? Or do you want to sell more homes? How about both? Start with AceableAgent today.",
                    id: this.id + "-quote",
                    image: {
                        imageExtensionClasses: "mx-auto",
                        slot: "additional",
                        src: "/uploads/sites/3/2018/04/Innerpage-3.png",
                        params: "w=260&auto=compress",
                    },
                    slot: "main",
                    source:
                        "**Chris Heller**, CEO of mello Home, formerly the CEO of Keller Williams, and the #1 Keller Williams associate in North America"
                },

                space: {
                    wrapperExtensionClasses: "bg-light py-5"
                },

                youtube: {
                    id: this.id + "-youtube",
                    slot: "aside",
                    src: "73ydz2ZtyUk"
                }
            });
        }
    },

    extends: callout,

    props: {
        id: {
            default: "youtube-quote",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyQuote v-bind="computedConfig.quote">
            <DiyImage v-bind="computedConfig.quote.image" v-if="computedConfig.quote.image.src" />
        </DiyQuote>
        <DiyYoutube v-bind="computedConfig.youtube" />
    </DiySpace>
</template>

<style lang="scss">
#youtube-quote-quote-body-content {
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1.4;
}

#youtube-quote-quote-source {
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
