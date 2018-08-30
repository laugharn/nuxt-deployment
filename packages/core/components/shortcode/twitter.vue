<script>
// Components
import DiyFacebook from "../diy/twitter.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyTwitter
    },

    mixins: [shortcode],

    name: "ShortcodeTwitter"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyTwitter v-bind="config" />
    </div>
</template>
