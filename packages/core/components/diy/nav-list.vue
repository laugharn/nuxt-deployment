<script>
// Components
import DiyNavItem from "./nav-item.vue";

// Mixins
import diy from "../mixins/diy";

/**
 * A nav list
 * @since 1.0.0
 */
export default {
    components: {
        DiyNavItem
    },

    methods: {
        /**
         * Handles the click event for the list items
         * @param {object} item
         * @public
         */
        handleClick(item) {
            if (item.event) {
                item.event();
            } else {
                this.$store.dispatch("page/goTo", item.href);
            }
        }
    },

    mixins: [diy],

    name: "DiyNavList",

    props: {
        /**
         * An array of item objects
         */
        items: {
            default: null,
            type: Array
        },

        /**
         * Classes that can be applied to the top level div
         */
        navListClasses: {
            default: "d-flex",
            type: String
        },

        navListExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Should we show the component
         */
        show: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

@import "../../assets/sass/components/diy/nav-list";
</style>

<template>
    <div :class="[navListClasses, navListExtensionClasses]" :id="id" v-if="show" v-show="items">
        <DiyNavItem @click.prevent="handleClick(item)" :id="identify('item-' + index)" :key="index" v-bind="item" v-for="(item, index) in items" />
    </div>
</template>
