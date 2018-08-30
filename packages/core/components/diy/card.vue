<script>
import diy from "../mixins/diy";

/**
 * A card.
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyCard",

    props: {
        /**
         * Classes that can be applied to the div after the card
         */
        afterClasses: {
            default: "Card__after --default",
            type: String
        },

        afterExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the div before the card
         */
        beforeClasses: {
            default: "Card__before --default",
            type: String
        },

        beforeExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the card
         */
        cardClasses: {
            default: "bg-white d-flex flex-column w-100",
            type: String
        },

        cardExtensionClasses: {
            default: "border border-light",
            type: String
        },

        /**
         * Classes that can be applied to the card footer
         */
        footerClasses: {
            default: "Card__footer",
            type: String
        },

        footerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the card header
         */
        headerClasses: {
            default: "Card__header",
            type: String
        },

        headerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the card main
         */
        mainAdditionalClasses: {
            default: "Card__main-additional",
            type: String
        },

        mainAdditionalExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the card main body
         */
        mainBodyClasses: {
            default: "Card__main-body",
            type: String
        },

        mainBodyExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the card main
         */
        mainClasses: {
            default: "d-flex flex-column flex-grow-1",
            type: String
        },

        mainExtensionClasses: {
            default: "p-3",
            type: String
        },

        /**
         * Classes that can be applied to the card main footer
         */
        mainFooterClasses: {
            default: "Card__main-footer",
            type: String
        },

        mainFooterExtensionClasses: {
            default: "mt-auto",
            type: String
        },

        /**
         * Classes that can be applied to the card main header
         */
        mainHeaderClasses: {
            default: "Card__main-header --default",
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
         * Should we show the card slot
         */
        showCard: {
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
            default: "Card__wrapper --default d-flex flex-grow-1",
            type: String
        },

        wrapperExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<style lang="scss">
.Card {
    background-color: white;
}
</style>

<template>
    <div :class="[wrapperClasses, wrapperExtensionClasses]" :id="identify('wrapper')" v-if="show">
        <div :class="[beforeClasses, beforeExtensionClasses]" :id="identify('before')" v-if="showBefore">
            <!-- @slot The slot before the card -->
            <slot name="before">
            </slot>
        </div>
        <div :class="[cardClasses, cardExtensionClasses]" :id="id" v-if="showCard">
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
            <!-- @slot The slot after the card -->
            <slot name="after">
            </slot>
        </div>
    </div>
</template>
