<script>
// Components
import DiyIframe from "../diy/iframe.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyIframe
    },

    mixins: [shortcode],

    name: "ShortcodeIframe"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyIframe v-bind="config" />
    </div>
</template>
