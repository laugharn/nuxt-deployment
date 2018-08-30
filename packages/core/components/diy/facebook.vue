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
        let data = await jsonp(
            `https://www.facebook.com/plugins/post/oembed.json/?url=${this.url}`
        ).promise;

        this.embed = unescape(data.html);

        (function(d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src =
                "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=1064623040288387";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");

        this.loading = false;
    },

    name: "DiyFacebook",

    props: {
        embedClasses: {
            default: null,
            type: String
        },

        embedExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        url: {
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
