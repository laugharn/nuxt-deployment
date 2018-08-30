<script>
import diy from "../mixins/diy";

/**
 * A nav
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyNav",

    props: {
        /**
         * Classes that can be applied to the center slot
         */
        centerSlotClasses: {
            default: "Nav__slot --center",
            type: String
        },

        centerSlotExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the left slot
         */
        leftSlotClasses: {
            default: "Nav__slot --left",
            type: String
        },

        leftSlotExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to top level div
         */
        navClasses: {
            default: "Nav --default",
            type: String
        },

        navExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the right slot
         */
        rightSlotClasses: {
            default: "Nav__slot --right",
            type: String
        },

        rightSlotExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Should we show the entire component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the center slot
         */
        showCenterSlot: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the left slot
         */
        showLeftSlot: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the right slot
         */
        showRightSlot: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.Nav {
    @include make-row();

    &__container {
        @include make-container();

        &.\--default {
            @include make-container-max-widths();
        }
    }

    &__slot {
        @include make-col-ready();

        display: flex;
        margin-bottom: auto;
        margin-top: auto;

        &.\--center {
            @include make-col(1, 6);

            justify-content: center;
        }

        &.\--left {
            @include make-col(5, 12);
        }

        &.\--right {
            @include make-col(5, 12);

            justify-content: flex-end;
        }
    }

    &__wrapper {
        &.\--default {
            background-color: white;
            position: sticky;
            top: 0;
            z-index: $zindex-sticky;

            &:after {
                background-image: linear-gradient(
                    rgba(map-get($grays, 600), 0.125),
                    rgba(map-get($grays, 600), 0)
                );
                content: "";
                height: ($spacer / 2);
                position: absolute;
                left: 0;
                bottom: -($spacer / 2);
                width: 100%;
                z-index: $zindex-sticky;
            }
        }

        &.\--checkout {
            position: relative;
        }
    }
}
</style>

<template>
    <div :class="[navClasses, navExtensionClasses]" :id="id" v-show="show">
        <!-- @slot The default slot -->
        <slot>
            <div :class="[leftSlotClasses, leftSlotExtensionClasses]" :id="identify('slot-left')" v-show="showLeftSlot">
                <!-- @slot The left slot -->
                <slot name="left"></slot>
            </div>
            <div :class="[centerSlotClasses, centerSlotExtensionClasses]" :id="identify('slot-center')" v-show="showCenterSlot">
                <!-- @slot The center slot -->
                <slot name="center"></slot>
            </div>
            <div :class="[rightSlotClasses, rightSlotExtensionClasses]" :id="identify('slot-right')" v-show="showRightSlot">
                <!-- @slot The right slot -->
                <slot name="right"></slot>
            </div>
        </slot>
    </div>
</template>
