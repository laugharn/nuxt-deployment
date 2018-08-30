<script>
import diy from "../mixins/diy";

/**
 * An icon
 * @since 1.0.0
 */
export default {
    computed: {
        computedIconClasses() {
            return [
                this.iconClasses,
                this.iconExtensionClasses,
                this.type,
                "fa-" + this.icon
            ];
        }
    },

    data() {
        return {
            loading: true
        };
    },

    mixins: [diy],

    mounted() {
        this.loading = false;
    },

    name: "DiyIcon",

    props: {
        icon: {
            default: null,
            type: String
        },

        iconClasses: {
            default: null,
            type: String
        },

        iconExtensionClasses: {
            default: null,
            type: String
        },

        type: {
            default: "fas",
            type: String
        }
    }
};
</script>

<template>
    <small :class="computedIconClasses" :id="id" v-if="icon && !loading"></small>
</template>
