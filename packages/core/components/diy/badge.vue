<script>
import diy from "../mixins/diy";

// I feel awful about this
import { mapGetters } from "vuex";

export default {
    computed: {
        computedHref() {
            return this.type == "a" ? this.href : null;
        },

        ...mapGetters({
            count: "cart/count"
        })
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

    name: "DiyBadge",

    props: {
        /**
         * Classes that can be applied to the top level span/a
         */
        badgeClasses: {
            default: "Badge --default",
            type: String
        },

        badgeExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The content for the badge
         */
        content: {
            default: null,
            type: String
        },

        /**
         * The href if the badge type is set to a
         */
        href: {
            default: "#",
            type: String
        },

        /**
         * Should we show the component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * The type of element for the badge
         */
        type: {
            default: "span",
            type: String
        }
    }
};
</script>

<template>
    <component :class="[badgeClasses, badgeExtensionClasses]" :href="computedHref" :id="id" :is="type" v-if="show">
        <!-- @slot The default slot -->
        <slot>{{ markdown(content || String(count)) }}</slot>
    </component>
</template>
