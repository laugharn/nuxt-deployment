<script>
// Components
import DiyImage from "../diy/image.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyImage
    },

    computed: {
        computedComponentType() {
            return this.config.href ? "a" : "div";
        }
    },

    mixins: [shortcode],

    name: "ShortcodeImage"
};
</script>

<template>
    <component :class="[shortcodeClasses, shortcodeExtensionClasses]" :href="config.href || '#'" :is="computedComponentType">
        <DiyImage v-bind="config" />
    </component>
</template>
