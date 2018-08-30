<script>
// Components
import DiyQuote from "../diy/quote.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyQuote
    },

    mixins: [shortcode],

    name: "ShortcodeQuote"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyQuote v-bind="config" />
    </div>
</template>
