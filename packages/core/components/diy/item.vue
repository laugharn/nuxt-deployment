<script>
import diy from "../mixins/diy";

/**
 * An item.
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyItem",

    props: {
        /**
         * Classes that can be applied to the div after the item
         */
        afterClasses: {
            default: "Item__after --default",
            type: String
        },

        afterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the div before the item
         */
        beforeClasses: {
            default: "Item__before --default",
            type: String
        },

        beforeExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item
         */
        itemClasses: {
            default: "Item --default",
            type: String
        },

        itemExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item footer
         */
        footerClasses: {
            default: "Item__footer --default",
            type: String
        },

        footerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item header
         */
        headerClasses: {
            default: "Item__header --default",
            type: String
        },

        headerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item main
         */
        mainClasses: {
            default: "Item__main --default",
            type: String
        },

        /**
         * Classes that can be applied to the item main
         */
        mainAdditionalClasses: {
            default: "Item__main-additional --default",
            type: String
        },

        mainAdditionalExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item main body
         */
        mainBodyClasses: {
            default: "Item__main-body --default",
            type: String
        },

        mainBodyExtensionClasses: {
            default: null,
            type: String
        },

        mainExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item main footer
         */
        mainFooterClasses: {
            default: "Item__main-footer --default",
            type: String
        },

        mainFooterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the item main header
         */
        mainHeaderClasses: {
            default: "Item__main-header --default",
            type: String
        },

        mainHeaderExtensionClasses: {
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
         * Should we show the after slot
         */
        showAfter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the before slot
         */
        showBefore: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the footer slot
         */
        showFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the header slot
         */
        showHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the item slot
         */
        showItem: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main slot
         */
        showMain: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main additional slot
         */
        showMainAdditional: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main body slot
         */
        showMainBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main footer slot
         */
        showMainFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the main header slot
         */
        showMainHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Classes that can be applied to the top level div
         */
        wrapperClasses: {
            default: "Item__wrapper --default",
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
    <div :class="[wrapperClasses, wrapperExtensionClasses]" :id="identify('wrapper')" v-if="show">
        <div :class="[beforeClasses, beforeExtensionClasses]" :id="identify('before')" v-if="showBefore">
            <!-- @slot The slot before the item -->
            <slot name="before">
            </slot>
        </div>
        <div :class="[itemClasses, itemExtensionClasses]" :id="id" v-if="showItem">
            <!-- @slot The default slot -->
            <slot>

                <div :class="[headerClasses, headerExtensionClasses]" :id="identify('header')" v-if="showHeader">
                    <!-- @slot The header slot -->
                    <slot name="header">
                    </slot>
                </div>

                <div :class="[mainClasses, mainExtensionClasses]" :id="identify('main')" v-if="showMain">
                    <!-- @slot The main slot -->
                    <slot name="main">
                        <div :class="[mainHeaderClasses, mainHeaderExtensionClasses]" :id="identify('main-header')" v-if="showMainHeader">
                            <!-- @slot The main header slot -->
                            <slot name="main-header"></slot>
                        </div>

                        <div :class="[mainBodyClasses, mainBodyExtensionClasses]" :id="identify('main-body')" v-if="showMainBody">
                            <!-- @slot The main body slot -->
                            <slot name="main-body"></slot>
                        </div>

                        <div :class="[mainAdditionalClasses, mainAdditionalExtensionClasses]" :id="identify('main-additional')" v-if="showMainAdditional">
                            <!-- @slot The main additional slot -->
                            <slot name="main-additional"></slot>
                        </div>

                        <div :class="[mainFooterClasses, mainFooterExtensionClasses]" :id="identify('main-footer')" v-if="showMainFooter">
                            <!-- @slot The main footer slot -->
                            <slot name="main-footer"></slot>
                        </div>
                    </slot>
                </div>

                <div :class="[footerClasses, footerExtensionClasses]" :id="identify('footer')" v-if="showFooter">
                    <!-- @slot The footer slot -->
                    <slot name="footer">
                    </slot>
                </div>
            </slot>
        </div>
        <div :class="[afterClasses, afterExtensionClasses]" :id="identify('after')" v-if="showAfter">
            <!-- @slot The slot after the item -->
            <slot name="after">
            </slot>
        </div>
    </div>
</template>
