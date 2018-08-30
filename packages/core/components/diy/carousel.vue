<script>
import diy from "../mixins/diy";

/**
 * A Flickity-based card carousel
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    async mounted() {
        if (this.items) {
            await import("flickity");
        }
    },

    name: "DiyCarousel",

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
                    cellSelector: ".Carousel__column",
                    pageDots: false,
                    wrapAround: true
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

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

@import "../../assets/sass/utils/flickity";

.Carousel {
    overflow-x: hidden;

    &__column {
        @include make-col-ready();

        padding: $spacer;

        @include media-breakpoint-up(md) {
            @include make-col(1, 3);
        }

        @include media-breakpoint-down(sm) {
            @include make-col(5, 6);
        }
    }
}
</style>

<template>
    <div class="Carousel__wrapper" :class="wrapperClasses" :id="identify('wrapper')">
        <div class="Carousel" :data-flickity="JSON.stringify(flickityConfig)" :id="id" v-if="items" v-show="showItems && items">
            <div class="Carousel__column" :class="columnClasses" :id="identify('column-' + index)" :key="index" v-for="(item, index) in items">
                <!-- @slot the item scoped slot -->
                <slot v-bind="item">
                </slot>
            </div>
        </div>
        <br style="clear:both" />
    </div>
</template>
