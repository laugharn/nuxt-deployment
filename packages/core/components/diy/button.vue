<script>
import diy from "../mixins/diy";

/**
 * A button
 * @since 1.0.0
 */
export default {
    computed: {
        computedButtonClasses() {
            return [
                this.buttonClasses,
                this.buttonExtensionClasses,
                this.active ? "active" : null,
                this.block ? "btn-block" : null,
                this.disabled ? "disabled" : null,
                this.flex ? "--is-flex" : null,
                this.hidden ? "--is-hidden" : null,
                this.loading ? "--is-loading" : null
            ];
        },

        computedIconClasses() {
            return [this.iconType, "fa-" + this.icon];
        }
    },

    methods: {
        async handleClick(clickEvent) {
            if (this.event) {
                await this.event();
            } else {
                this.$emit("click", clickEvent);
            }
        }
    },

    mixins: [diy],

    name: "DiyButton",

    props: {
        /**
         * Is the button active in a button group
         */
        active: {
            default: false,
            type: Boolean
        },

        /**
         * Applies autofocus to the button
         */
        autofocus: {
            default: false,
            type: Boolean
        },

        /**
         * Defines whether the button is set as block-level
         */
        block: {
            default: false,
            type: Boolean
        },

        /**
         * Classes that can be applied to the top level item div
         */
        buttonClasses: {
            default: "btn",
            type: String
        },

        buttonExtensionClasses: {
            default: "btn-link",
            type: String
        },

        /**
         * Disables button and applies disabled styling
         */
        disabled: {
            default: false,
            type: Boolean
        },

        event: {
            default: null,
            type: Function
        },

        /**
         * Defines whether the button is given a display:flex
         */
        flex: {
            default: false,
            type: Boolean
        },

        /**
         * Defines whether the button is hidden
         */
        hidden: {
            default: false,
            type: Boolean
        },

        /**
         * Sets URL destination for click method
         */
        href: {
            default: null,
            type: String
        },

        /**
         * Name of icon to go before or after the button text
         */
        icon: {
            default: null,
            type: String
        },

        /**
         * Defines icon family set, defaulting to Font Awesome
         */
        iconType: {
            default: "fas",
            type: String
        },

        /**
         * Defines whether the button is loading
         */
        loading: {
            default: false,
            type: Boolean
        },

        // TODO write somthing more clear here? Not sure what the other options are
        /**
         * Defines whether this is a native button
         */
        nativeType: {
            default: "button",
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * Sets icon to show before text if present
         */
        showIconBefore: {
            default: false,
            type: Boolean
        },

        /**
         * Sets icon to show after text if present
         */
        showIconAfter: {
            default: false,
            type: Boolean
        },

        /**
         * Defines the size of the button between sm, md, and lg. Defaults to md
         */
        size: {
            default: "md",
            type: String
        },

        /**
         * The text inside of the button
         */
        title: {
            default: null,
            type: String
        },

        titleClasses: {
            default: "Button__title --default",
            type: String
        },

        titleExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<template>
    <button
        :autofocus="autofocus"
        :class="computedButtonClasses"
        @click.prevent="handleClick($event)"
        :disabled="disabled"
        :hidden="hidden"
        :id="id"
        :type="nativeType"

        v-if="show"
    >

        <span :class="[titleClasses, titleExtensionClasses]" :id="identify('title')" v-if="this.title || $slots.default">
            <slot name="loading">
              <i class="loading fas fa-spinner" v-if="loading"></i>
            </slot>
            <slot name="before-title">
              <small :class="computedIconClasses" v-if="showIconBefore && !loading"></small>
            </slot>
            <slot name="title">
                <span v-html="title"></span>
            </slot>
            <slot name="after-title">
                <small :class="computedIconClasses" v-if="showIconAfter && !loading"></small>
            </slot>
        </span>
    </button>
</template>
