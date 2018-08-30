<script>
import diy from "../mixins/diy";
import DiyButton from "./button.vue";

export default {
    components: {
        DiyButton
    },

    mixins: [diy],

    name: "DiyButtonGroup",

    props: {
        /**
         * The index of the active button in the group
         */
        activeIndex: {
            default: 0,
            type: Number
        },

        /**
         * Classes that can be applied to each button
         */
        buttonClasses: {
            default: null,
            type: String
        },

        buttonExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * An array of button objects
         */
        buttons: {
            default: null,
            type: Array
        },

        /**
         * Classes that can be applied to the top level div
         */
        groupClasses: {
            default: "btn-group",
            type: String
        },

        groupExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Should we show the entire component
         */
        show: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<template>
    <div :class="[groupClasses, groupExtensionClasses]" :id="id" v-if="show">
        <!-- @slot The default slot -->
        <slot>
            <DiyButton :active="activeIndex == index" :button-classes="button.buttonClasses || [buttonClasses, buttonExtensionClasses]" @click.prevent="button.handleClick" :id="identify('button-' + index)" :key="index" v-bind="button" v-for="(button, index) in buttons" v-if="buttons">
            </DiyButton>
        </slot>
    </div>
</template>
