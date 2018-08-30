<script>
import diy from "../mixins/diy";

/**
 * A marquee. Very WIP.
 *
 * @since 1.0.0
 * @todo A lot.
 */
export default {
    async mounted() {
        let marquee = await import("marquee3000");

        let init = marquee.init({
            selector: this.selector
        });
    },

    mixins: [diy],

    name: "DiyMarquee",

    props: {
        contents: {
            default: null,
            type: Array
        },

        contentClasses: {
            default: "d-flex",
            type: String
        },

        contentItemClasses: {
            default: "--default",
            type: String
        },

        contentWrapperClasses: {
            default: "--default",
            type: String
        },

        marqueeClasses: {
            default: "--default",
            type: String
        },

        pausable: {
            default: false,
            type: Boolean
        },

        reverse: {
            default: false,
            type: Boolean
        },

        selector: {
            default: "Marquee",
            type: String
        },

        speed: {
            default: 1,
            type: Number
        },

        wrapperClasses: {
            default: "wrapper",
            type: String
        }
    }
};
</script>

<template>
    <div class="Marquee__wrapper" :class="wrapperClasses" :id="identify('wrapper')" v-if="contents">
        <div class="Marquee" :class="marqueeClasses" :data-pausable="pausable" :data-reverse="reverse" :data-speed="speed" :id="id">
            <div class="Marquee__content-wrapper" :class="contentWrapperClasses" :id="identify('content-wrapper')">
                <div class="Marquee__content" :class="contentClasses" :id="identify('content')">
                    <div class="Marquee__content-item" :class="contentItemClasses" :id="identify('item-' + index)" :key="index" v-for="(content, index) in contents">
                        {{ content.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
