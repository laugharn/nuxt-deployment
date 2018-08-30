<script>
// Mixins
import shortcode from "../mixins/shortcode";

export default {
    mixins: [shortcode],

    name: "ShortcodeHr"
};
</script>

<template>
    <div :class="[shortcodeClasses, shortcodeExtensionClasses]">
        <hr />
    </div>
</template>
