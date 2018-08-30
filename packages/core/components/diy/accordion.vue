<script>
// Components
import DiyAccordionItem from "./accordion-item.vue";

// Mixins
import diy from "../mixins/diy";

/**
 * A collection of items in an accordion
 * @since 1.0.0
 */
export default {
    components: { DiyAccordionItem },

    mixins: [diy],

    name: "DiyAccordion",

    props: {
        /**
         * Default classes on the top level item div
         */
        accordionClasses: {
            default: "Accordion --default",
            type: String
        },

        /**
         * Classes that can be applied to the top level item div
         */
        accordionExtensionClasses: {
            default: null
        },

        /**
         * The items for the accordion
         */
        items: {
            default: null,
            type: Array
        },

        /**
         * Should all of the items be initially toggled
         */
        itemsInitiallyToggled: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show the component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show numbers
         */
        showNumbers: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show toggle icons
         */
        showToggleIcons: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show toggle text
         */
        showToggleText: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<template>
    <div :class="[accordionClasses, accordionExtensionClasses]" :id="id" v-if="show">
        <!-- @slot The default slot -->
        <slot>
            <DiyAccordionItem
                :id="identify('item-' + index)"
                :initially-toggled="item.initallyToggled || itemsInitiallyToggled"
                :key="index"
                :number="index+1"
                :show-number="showNumbers"
                :show-toggle-text="showToggleText"
                :show-toggle-icons="showToggleIcons"
                v-bind="item"
                v-for="(item, index) in items" v-if="items"
            >
            </DiyAccordionItem>
        </slot>
    </div>
</template>
