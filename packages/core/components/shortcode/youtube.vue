<script>
// Components
import DiyYoutube from "../diy/youtube.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyYoutube
    },

    computed: {
        computedConfig() {
            let config = this.config;

            config.maxWidth = config.max_width;
            config.src = config.video_id;

            return config;
        }
    },

    mixins: [shortcode],

    name: "ShortcodeYoutube"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyYoutube v-bind="computedConfig" />
    </div>
</template>
