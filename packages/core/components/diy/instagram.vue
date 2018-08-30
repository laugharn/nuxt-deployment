<script>
import jsonp from "jsonp-promise";

export default {
    data() {
        return {
            embed: null,
            loading: true
        };
    },

    async mounted() {
        const data = await jsonp(
            `https://api.instagram.com/oembed?url=http://instagr.am/p/${
                this.id
            }/&hidecaption=${this.hideCaption}`
        ).promise;

        this.embed = unescape(data.html);

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "//platform.instagram.com/en_US/embeds.js";
        const x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);

        this.loading = false;
    },

    name: "DiyInstagram",

    props: {
        embedClasses: {
            default: null,
            type: String
        },

        embedExtensionClasses: {
            default: null,
            type: String
        },

        hideCaption: {
            default: true
        },

        id: {
            default: null
        },

        show: {
            default: true,
            type: Boolean
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
    <div :class="[wrapperClasses, wrapperExtensionClasses]" v-if="!loading && show && id">
        <div :class="[embedClasses, embedExtensionClasses]" v-html="embed" v-if="embed">
        </div>
    </div>
</template>
