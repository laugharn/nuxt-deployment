<script>
// Mixins
import diy from "../mixins/diy";

/**
 * An image
 * @since 1.0.0
 */
export default {
    computed: {
        computedSrc() {
            if (this.remote) {
                return this.src;
            }

            return this.imgix(
                this.params ? this.src + "?" + this.params : this.src
            );
        }
    },

    mixins: [diy],

    name: "DiyImage",

    props: {
        backgroundClasses: {
            default: "Image__background --default",
            type: String
        },

        backgroundExtensionClasses: {
            default: "d-flex",
            type: String
        },

        backgroundWrapperClasses: {
            default: "Image__background-wrapper --default",
            type: String
        },

        backgroundWrapperExtensionClasses: {
            default: null,
            type: [Array, String]
        },

        height: {
            default: null,
            type: String
        },

        imageClasses: {
            default: "Image --default",
            type: String
        },

        imageExtensionClasses: {
            default: null,
            type: String
        },

        imageStyle: {
            default: null,
            type: String
        },

        params: {
            default: null,
            type: String
        },

        remote: {
            default: false,
            type: [Boolean, String]
        },

        show: {
            default: true,
            type: Boolean
        },

        src: {
            default: null,
            type: String
        },

        type: {
            default: "default",
            type: String
        },

        width: {
            default: null,
            type: String
        },

        wrapperClasses: {
            default: "Image__wrapper --default",
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
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.Image {
    display: block;
    max-width: 100%;

    &__background {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;

        &-wrapper {
            background-color: map-get($grays, 500);
            position: relative;
            width: 100%;

            &:before {
                content: "";
                display: block;
            }
        }
    }

    &__wrapper {
        //
    }
}
</style>

<template>
    <div :class="[wrapperClasses, wrapperExtensionClasses]" :id="identify('wrapper')" v-if="show">
        <div :class="[backgroundWrapperClasses, backgroundWrapperExtensionClasses]" :id="identify('background-wrapper')" v-if="type == 'background'">
            <div :class="[backgroundClasses, backgroundExtensionClasses]" :id="identify('background')" v-lazy:background-image="computedSrc">
                <slot></slot>
            </div>
        </div>
        <img :class="[imageClasses, imageExtensionClasses]" :height="height" :id="id" :style="imageStyle" v-if="type == 'default'" v-lazy="computedSrc" :width="width" />
    </div>
</template>
