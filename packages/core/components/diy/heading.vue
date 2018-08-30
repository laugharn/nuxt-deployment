<script>
import diy from "../mixins/diy";

/**
 * A heading
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyHeading",

    props: {
        content: {
            default: null,
            type: String
        },

        headingClasses: {
            default: "Heading --default",
            type: String
        },

        headingExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        type: {
            default: "h2",
            type: String
        }
    }
};
</script>

<template>
    <component :class="[headingClasses, headingExtensionClasses]" :id="id" :is="type" v-if="show">
        <slot name="before"></slot>
        <slot>{{ markdown(content) }}</slot>
        <slot name="after"></slot>
    </component>
</template>
