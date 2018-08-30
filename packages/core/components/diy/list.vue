<script>
// Components
import DiyListItem from "./list-item.vue";

// Mixins
import diy from "../mixins/diy";

// Libraries
import merge from "lodash/merge";

/**
 * A List
 * @since 1.0.0
 */
export default {
    components: {
        DiyListItem
    },

    computed: {
        computedListClasses() {
            return [
                this.listClasses,
                this.listExtensionClasses,
                this.inline ? "list-inline" : null,
                this.unstyled ? "list-unstyled" : null,
                "--is-" + this.type
            ];
        }
    },
    mixins: [diy],

    name: "diy--list",

    props: {
        icon: {
            default: null,
            type: Object
        },

        /**
         * Displays list items inline
         */
        inline: {
            default: false,
            type: Boolean
        },

        /**
         * Classes that can be applied to each item
         */
        itemClasses: {
            default: "List__item --default",
            type: String
        },

        itemExtensionClasses: {
            default: null,
            type: String
        },

        itemsBeforeExtensionClasses: {
            default: "mr-1 my-auto",
            type: String
        },

        itemsInnerExtensionClasses: {
            default: null,
            type: String
        },

        itemsItemExtensionClasses: {
            default: null,
            type: String
        },

        itemsShowAfter: {
            default: false,
            type: Boolean
        },

        itemsShowBefore: {
            default: false,
            type: Boolean
        },

        /**
         * Items to iterate in list. Accepts Markdown
         */
        items: {
            default() {
                return [];
            },
            type: Array
        },

        /**
         * Classes that can be applied to the top level item div
         */
        listClasses: {
            default: "List --default",
            type: String
        },

        listExtensionClasses: {
            default: null,
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
         * The type of list
         */
        type: {
            default: "ul",
            type: String
        },

        unstyled: {
            default: false,
            type: Boolean
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.List {
    &__item {
        &-after {
            &:empty {
                display: none;
            }

            align-items: center;
            display: flex;
            margin-left: ($spacer / 3);
        }

        &-before {
            &:empty {
                display: none;
            }

            align-items: center;
            display: flex;
            margin-right: ($spacer / 3);
        }

        &-content {
            &:empty {
                display: none;
            }

            align-items: center;
            display: flex;
            flex: 1;
        }

        &-inner {
            align-items: center;
            display: inline-flex;
        }
    }

    &.\--is-ol {
        list-style-type: decimal !important;
        padding-left: $spacer;
    }
}
</style>

<template>
    <component :is="type"
        :class="computedListClasses"
        :id="id"
        v-if="show"
    >
        <DiyListItem
            :before-extension-classes="item.beforeExtensionClasses || itemsBeforeExtensionClasses"
            :icon="item.icon || icon"
            :id="id + '-item-' + index"
            :inline="inline"
            :inner-extension-classes="item.innerExtensionClasses || itemsInnerExtensionClasses"
            :item-extension-classes="item.itemExtensionClasses || itemsItemExtensionClasses"
            :key="index"
            :show-after="item.showAfter || itemsShowAfter"
            :show-before="item.showBefore || itemsShowBefore"
            v-for="(item, index) in items"
            v-bind="item"
        />
    </component>
</template>
