<script>
// Components
import DiyImage from "../diy/image.vue";
import DiyQuote from "../diy/quote.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyImage,
        DiyQuote
    },

    mixins: [shortcode],

    name: "ShortcodeQuoteimage",

    props: {
        wrapperExtensionClasses: {
            default: "row",
            type: String
        }
    }
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <div class="col-md-6 col-12 my-auto p-3">
            <DiyQuote v-bind="config" />
        </div>
        <div class="col-md-6 col-12 my-auto p-3">
            <DiyImage v-bind="config" />
        </div>
    </div>
</template>
