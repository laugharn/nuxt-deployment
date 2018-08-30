<script>
import diy from "../mixins/diy";

export default {
    mixins: [diy],

    name: "DiyPricing",

    props: {
        current: {
            default: null,
            type: [Number, String]
        },

        currentClasses: {
            default: null,
            type: String
        },

        currentExtensionClasses: {
            default: "font-size-h4 font-weight-bold my-auto",
            type: String
        },

        max: {
            default: null,
            type: [Number, String]
        },

        maxClasses: {
            default: null,
            type: String
        },

        maxExtensionClasses: {
            default: "my-auto pr-2 text-secondary text-strike",
            type: String
        },

        pricingClasses: {
            default: "d-flex my-auto",
            type: String
        },

        pricingExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<template>
    <div :class="[pricingClasses, pricingExtensionClasses]" :id="id">
        <div :class="[maxClasses, maxExtensionClasses]" :id="identify('max')" v-html="markdown(max)" v-if="max"></div>
        <div :class="[currentClasses, currentExtensionClasses]" :id="identify('current')" v-html="markdown(current)" v-if="current"></div>
    </div>
</template>
