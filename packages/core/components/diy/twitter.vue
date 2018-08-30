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
        const url = this.url
            ? this.url
            : "https://twitter.com/" +
              this.username +
              "/" +
              status +
              "/" +
              this.id;

        const data = await jsonp(
            `https://publish.twitter.com/oembed?url=${url}`
        ).promise;

        this.embed = unescape(data.html);

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "//platform.twitter.com/widgets.js";

        const x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);

        this.loading = false;
    },

    name: "DiyTwitter",

    props: {
        embedClasses: {
            default: null,
            type: String
        },

        embedExtensionClasses: {
            default: null,
            type: String
        },

        id: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: [Boolean, String]
        },

        url: {
            default: null,
            type: String
        },

        username: {
            default: null,
            type: String
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
    <div :class="[wrapperClasses, wrapperExtensionClasses]" v-if="!loading && show && url">
        <div :class="[embedClasses, embedExtensionClasses]" v-html="embed" v-if="embed">
        </div>
    </div>
</template>
