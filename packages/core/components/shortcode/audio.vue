<script>
// Components
// import DiyAudio from "../diy/audio.vue";

// Mixins
import shortcode from "../mixins/shortcode";

export default {
    // components: {
    //     DiyAudio
    // },

    mixins: [shortcode],

    name: "ShortcodeAudio"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <!-- <DiyAudio v-bind="config" /> -->
    </div>
</template>
