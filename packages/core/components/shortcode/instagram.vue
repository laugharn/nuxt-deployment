<script>
// Components
import DiyInstagram from "../diy/instagram.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyInstagram
    },

    mixins: [shortcode],

    name: "ShortcodeInstagram"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyInstagram v-bind="config" />
    </div>
</template>
