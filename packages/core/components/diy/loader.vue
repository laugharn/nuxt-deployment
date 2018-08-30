<script>
import DiyIcon from "./icon.vue";

export default {
    components: {
        DiyIcon
    },

    computed: {
        computedIconClasses() {
            return [this.iconClasses, this.iconExtensionClasses].join(" ");
        }
    },

    props: {
        icon: {
            default: "spinner",
            type: String
        },

        iconClasses: {
            default: "is-loading",
            type: String
        },

        iconExtensionClasses: {
            default: "font-size-h2 is-loading text-brand",
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        showIcon: {
            default: true,
            type: Boolean
        },

        wrapperClasses: {
            default: null,
            type: String
        },

        wrapperExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<template>
    <span :class="[wrapperClasses, wrapperExtensionClasses]" v-if="show">
        <slot>
            <DiyIcon :icon="icon" :icon-extension-classes="iconExtensionClasses" :show="showIcon" />
        </slot>
    </span>
</template>
