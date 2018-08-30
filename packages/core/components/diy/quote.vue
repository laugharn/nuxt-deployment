<script>
// Components
import DiyIcon from "./icon.vue";

// Mixins
import diy from "../mixins/diy";

/**
 * A quote.
 * @since 1.0.0
 */
export default {
    components: {
        DiyIcon
    },

    computed: {
        computedIconAfter() {
            return {
                icon: this.iconAfter,
                iconClasses: this.iconAfterClasses,
                type: this.iconAfterType
            };
        },

        computedIconBefore() {
            return {
                icon: this.iconBefore,
                iconClasses: this.iconBeforeClasses,
                type: this.iconBeforeType
            };
        }
    },

    mixins: [diy],

    name: "DiyQuote",

    props: {
        /**
         * Classes that can be applied to the additional section
         */
        additionalClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the div after the quote
         */
        afterClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the div before the quote
         */
        beforeClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the body
         */
        bodyClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the body content
         */
        bodyContentClasses: {
            default: "--default",
            type: String
        },

        /**
         * The quote
         */
        content: {
            default: null,
            type: String
        },

        /**
         * The after icon
         */
        iconAfter: {
            default: "quote-right",
            type: String
        },

        /**
         * Classes that can be applied to the after icon
         */
        iconAfterClasses: {
            default: "text-brand",
            type: String
        },

        /**
         * The after icon type
         */
        iconAfterType: {
            default: "fa",
            type: String
        },

        /**
         * The before icon
         */
        iconBefore: {
            default: "quote-left",
            type: String
        },

        /**
         * Classes that can be applied to the before icon
         */
        iconBeforeClasses: {
            default: "text-brand",
            type: String
        },

        /**
         * The before icon type
         */
        iconBeforeType: {
            default: "fa",
            type: String
        },

        /**
         * Classes that can be applied to the quote
         */
        quoteClasses: {
            default: "--default",
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
         * Should we show the additional section
         */
        showAdditional: {
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
         * Should we show the body
         */
        showBody: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the quote
         */
        showQuote: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the source
         */
        showSource: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the source prefix character
         */
        showSourcePrefix: {
            default: true,
            type: Boolean
        },

        /**
         * The source
         */
        source: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the source div
         */
        sourceClasses: {
            default: "--default",
            type: String
        },

        /**
         * Classes that can be applied to the source content
         */
        sourceContentClasses: {
            default: "--default",
            type: String
        },

        /**
         * The source prefix character
         */
        sourcePrefix: {
            default: "―"
        },

        /**
         * Classes that can be applied to the top level div
         */
        wrapperClasses: {
            default: "--default",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.Quote {
    display: flex;

    &__after {
        display: flex;
        flex-direction: column;
        font-size: $h3-font-size;
        justify-content: flex-end;
        line-height: $headings-line-height;
        padding-left: $spacer;
    }

    &__before {
        display: flex;
        flex-direction: column;
        font-size: $h3-font-size;
        line-height: $headings-line-height;
        padding-right: $spacer;
    }

    &__body {
        font-size: map-get($headings-font-sizes, h4);
        font-weight: $headings-font-weight;
        line-height: $headings-line-height;
        text-align: center;
    }

    &__source {
        padding: $spacer 0;
        text-align: center;
    }

    &__wrapper {
        //
    }
}
</style>

<template>
    <div class="Quote__wrapper" :class="wrapperClasses" :id="identify('wrapper')" v-if="show">
        <slot>
            <div class="Quote" :class="quoteClasses" :id="id" v-if="showQuote">
                <slot name="quote">
                    <div class="Quote__before" :class="beforeClasses" :id="identify('before')" v-if="showBefore">
                        <slot name="quote-before">
                            <DiyIcon :id="identify('icon-before')" v-bind="computedIconBefore" v-if="computedIconBefore" />
                        </slot>
                    </div>
                    <div class="Quote__body" :class="bodyClasses" :id="identify('body')" v-if="showBody">
                        <slot name="quote-body">
                            <div class="Quote__body-content" :class="bodyContentClasses" :id="identify('body-content')" v-html="markdown(content)" v-if="content"></div>
                        </slot>
                    </div>
                    <div class="Quote__after" :class="afterClasses" :id="identify('after')" v-if="showAfter">
                        <slot name="quote-after">
                            <DiyIcon :id="identify('icon-after')" v-bind="computedIconAfter" v-if="computedIconAfter" />
                        </slot>
                    </div>
                </slot>
            </div>
            <div class="Quote__source" :class="sourceClasses" :id="identify('source')" v-if="showSource && source">
                <slot name="source">
                    <span class="Quote__source-prefix" :id="identify('source-prefix')" v-html="sourcePrefix" v-if="showSourcePrefix"></span>
                    <span class="Quote__source-content" :class="sourceContentClasses" :id="identify('source-content')" v-html="markdown(source)" v-if="source"></span>
                </slot>
            </div>
            <div class="Quote__additional" :class="additionalClasses" :id="identify('additional')" v-if="showAdditional">
                <slot name="additional">
                </slot>
            </div>
        </slot>
    </div>
</template>
