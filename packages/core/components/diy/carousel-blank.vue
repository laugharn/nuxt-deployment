<script>
import diy from "../mixins/diy";

/**
 * A Flickity-based card carousel, the same as core carousel but without any styles added. Just boilerplate flickity. Consult the flickity documentation for guidance on how to style this component.
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    async mounted() {
        if (this.items) {
            await import("flickity");
        }
    },

    name: "DiyCarouselBlank",

    props: {
        /**
         * Classes that can be applied to the column divs
         */
        columnClasses: {
            default: "--default",
            type: String
        },

        /**
         * The flickity configuration object
         */
        flickityConfig: {
            default() {
                return {
                    cellSelector: ".CarouselBlank__column",
                    draggable: true
                };
            },
            type: Object
        },

        /**
         * The items to cycle through
         */
        items: {
            default: null,
            type: Array
        },

        /**
         * Should we show the items
         */
        showItems: {
            default: true,
            type: Boolean
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

<template>
    <div class="CarouselBlank__wrapper" :class="wrapperClasses" :id="identify('wrapper')">
        <div class="CarouselBlank" :data-flickity="JSON.stringify(flickityConfig)" :id="id" v-if="items" v-show="showItems && items">
            <div class="CarouselBlank__column" :class="columnClasses" :id="identify('column-' + index)" :key="index" v-for="(item, index) in items">
                <!-- @slot the item scoped slot -->
                <slot v-bind="item">
                </slot>
            </div>
        </div>
        <br style="clear:both" />
    </div>
</template>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

@import "../../assets/sass/utils/flickity";
</style>
