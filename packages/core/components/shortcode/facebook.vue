<script>
// Components
import DiyFacebook from "../diy/facebook.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyFacebook
    },

    mixins: [shortcode],

    name: "ShortcodeFacebook"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyFacebook v-bind="config" />
    </div>
</template>
