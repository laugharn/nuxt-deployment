<script>
import diy from "../mixins/diy";

/**
 * An SVG shape
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyShape",

    props: {
        /**
         * Classes that can be applied to the top level div
         */
        height: {
            default: "100%",
            type: String
        },

        /**
         * A comma separated list of the SVG points
         */
        points: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the polygon
         */
        polygonClasses: {
            default: "--default",
            type: String
        },

        /**
         * The preserveAspectRatio attribute of the SVG
         */
        preserveAspectRatio: {
            default: "none",
            type: String
        },

        /**
         * Classes that can be applied to the shape
         */
        shapeClasses: {
            default: "--default",
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the polygon
         */
        showPolygon: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the shape
         */
        showShape: {
            default: true,
            type: Boolean
        },

        /**
         * A space separated list of the viewBox coordinates
         */
        viewBox: {
            default: "0 0 100 100",
            type: String
        },

        /**
         * The component width as a percentage string
         */
        width: {
            default: "100%",
            type: String
        }
    }
};
</script>

<template>
    <svg class="Shape" :class="shapeClasses" height="100%" :id="id" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%" v-show="showShape" v-if="points && show">
        <polygon class="Space__polygon" :class="polygonClasses" :id="identify('polygon')" :points="points" v-show="showPolygon"></polygon>
    </svg>
</template>
