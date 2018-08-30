<script>
import diy from "../mixins/diy";

/**
 * A structure
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyStructure",

    props: {
        /**
         * Classes that can be applied to the body
         */
        bodyClasses: {
            default: "Structure__body",
            type: String
        },

        bodyExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the footer
         */
        footerClasses: {
            default: "Structure__footer",
            type: String
        },

        footerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the header
         */
        headerClasses: {
            default: "Structure__header",
            type: String
        },

        headerExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the body
         */
        showBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the footer
         */
        showFooter: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the header
         */
        showHeader: {
            default: true,
            type: Boolean
        },

        /**
         * Classes that can be applied to the top level div
         */
        structureClasses: {
            default: "Structure",
            type: String
        },

        structureExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

#livechat-compact-container {
    z-index: 999 !important;
}
@include media-breakpoint-up(md) {
    #livechat-compact-container,
    #livechat-full {
        left: 20px !important;
        right: auto !important;
    }
}

.Structure {
    display: flex;
    flex-direction: column;

    &__body {
        display: flex;
        flex-direction: column;
    }

    &__footer {
        display: flex;
        flex-direction: column;
    }

    &__header {
        display: flex;
        flex-direction: column;
    }
}
</style>

<template>
    <div :class="[structureClasses, structureExtensionClasses]" :id="id" v-if="show">
        <!-- @slot The default slot -->
        <slot name="structure">
            <div :class="[headerClasses, headerExtensionClasses]" :id="identify('header')" v-show="showHeader">
                <!-- @slot The header slot -->
                <slot name="header"></slot>
            </div>
            <div :class="[bodyClasses, bodyExtensionClasses]" :id="identify('body')" v-show="showBody">
                <!-- @slot The body slot -->
                <slot></slot>
            </div>
            <div :class="[footerClasses, footerExtensionClasses]" :id="identify('footer')" v-show="showFooter">
                <!-- @slot The footer slot -->
                <slot name="footer"></slot>
            </div>
        </slot>
    </div>
</template>
