<script>
// Components
import DiyButton from "../diy/button.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    components: {
        DiyButton
    },

    computed: {
        computedConfig() {
            let config = this.config;

            config.buttonExtensionClasses = config.buttonExtensionClasses
                ? config.buttonExtensionClasses
                : "btn-convert";

            return config;
        }
    },

    mixins: [shortcode],

    name: "ShortcodeButton"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <DiyButton v-bind="computedConfig" />
    </div>
</template>
