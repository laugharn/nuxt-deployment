<script>
import diy from "../mixins/diy";

export default {
    computed: {
        ratio() {
            return (this.height / this.width) * 100;
        }
    },

    data() {
        return {
            loading: true
        };
    },

    mixins: [diy],

    mounted() {
        let style = document.createElement("style");
        document.head.appendChild(style);

        let sheet = style.sheet;
        sheet.addRule(`#${this.id}::after`, `padding-top: ${this.ratio}%`);

        this.loading = false;
    },

    name: "DiyIframe",

    props: {
        height: {
            default: 315,
            type: [Number, String]
        },

        iframeClasses: {
            default: null,
            type: String
        },

        iframeExtensionClasses: {
            default: null,
            type: String
        },

        scrolling: {
            default: "no",
            type: String
        },

        src: {
            default: null,
            type: String
        },

        width: {
            default: 560,
            type: [Number, String]
        },

        wrapperClasses: {
            default: null,
            type: String
        },

        wrapperExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<template>
    <div :class="[wrapperClasses, wrapperExtensionClasses]" :id="id" v-if="!loading && show">
        <iframe :class="[iframeClasses, iframeExtensionClasses]" :scrolling="scrolling" :src="src" v-if="src"></iframe>
    </div>
</template>
