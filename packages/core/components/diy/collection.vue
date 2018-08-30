<script>
import diy from "../mixins/diy";

/**
 * A collection
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyCollection",

    props: {
        /**
         * Classes that can be applied to the top level div
         */
        collectionClasses: {
            default: "row",
            type: String
        },

        collectionExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the columns
         */
        columnClasses: {
            default: "col-md col-12 py-2",
            type: String
        },

        columnExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * An array of item objects
         */
        items: {
            default: null,
            type: Array
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

<template>
    <div :class="[collectionClasses, collectionExtensionClasses]" :id="id" v-if="show">
        <div :class="[(item.columnClasses || columnClasses), (item.columnExtensionClasses || columnExtensionClasses)]" :id="identify('column-' + index)" :key="index" v-for="(item, index) in items">
            <slot v-bind="item">
                {{ item }}
            </slot>
        </div>
    </div>
</template>
