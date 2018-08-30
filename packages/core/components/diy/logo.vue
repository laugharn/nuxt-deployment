<script>
import diy from "../mixins/diy";

/**
 * A logo
 * @since 1.0.0
 */
export default {
    computed: {
        computedDesktopLogoClasses() {
            return [
                this.showDesktopSrcOnMobile == true
                    ? "--show-on-mobile"
                    : "--hide-on-mobile",
                this.desktopLogoClasses,
                this.desktopLogoExtensionClasses
            ];
        },

        computedMobileLogoClasses() {
            return [
                this.showMobileSrcOnDesktop == true
                    ? "--show-on-desktop"
                    : "--hide-on-desktop",
                this.mobileLogoClasses,
                this.mobileLogoExtensionClasses
            ];
        }
    },

    methods: {
        async handle() {
            if (!this.handleClick) {
                if (this.href) {
                    this.$store.dispatch("page/goTo", this.href);
                }
            } else {
                this.handleClick();
            }
        }
    },

    mixins: [diy],

    name: "diy--logo",

    props: {
        desktopLogoClasses: {
            default: "Logo --desktop --default",
            type: String
        },

        desktopLogoExtensionClasses: {
            default: null,
            type: String
        },

        desktopSrc: {
            default: null,
            type: String
        },

        handleClick: {
            default: null,
            type: Function
        },

        href: {
            default: "#",
            type: String
        },

        mobileLogoClasses: {
            default: "Logo --mobile --default",
            type: String
        },

        mobileLogoExtensionClasses: {
            default: null,
            type: String
        },

        mobileSrc: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        showDesktopSrcOnMobile: {
            default: false,
            type: Boolean
        },

        showMobileSrcOnDesktop: {
            default: false,
            type: Boolean
        },

        type: {
            default: "a",
            type: String
        },

        wrapperClasses: {
            default: "Logo__wrapper --default",
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

.Logo {
    display: block;
    max-height: ($spacer * 2);

    &.\--desktop {
        @include media-breakpoint-down(sm) {
            display: none;
        }
    }

    &.\--mobile {
        @include media-breakpoint-up(md) {
            display: none;
        }
    }

    &__wrapper {
        //
    }
}
</style>

<template>
    <component :class="[wrapperClasses, wrapperExtensionClasses]" @click.prevent="handle()" :href="href" :id="id" :is="type" v-if="show">
        <img :class="computedDesktopLogoClasses" :id="identify('desktop')" v-if="desktopSrc" v-lazy="imgix(desktopSrc)">
        <img :class="computedMobileLogoClasses" :id="identify('mobile')" v-if="mobileSrc" v-lazy="imgix(mobileSrc)">
    </component>
</template>
