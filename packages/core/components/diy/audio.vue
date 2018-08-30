<script>
import diy from "../mixins/diy";

export default {
    computed: {
        computedConfig() {
            return {
                autoplay: this.autoplay,
                music: {
                    artist: this.artist,
                    pic: this.pic,
                    src: this.src,
                    title: this.title
                }
            };
        }
    },

    data() {
        return {
            comp: "div"
        };
    },

    mixins: [diy],

    async mounted() {
        const Player = await import("vue-aplayer").then(
            response => response.default
        );

        this.comp = Player;
    },

    name: "DiyAudio",

    props: {
        autoplay: {
            default: false,
            type: Boolean
        },

        artist: {
            default: null,
            type: String
        },

        pic: {
            default: "/icon.png",
            type: String
        },

        src: {
            default: null,
            type: String
        },

        title: {
            default: null,
            type: String
        }
    }
};
</script>

<template>
    <component
        :is="comp"
        v-bind="computedConfig"
    >
    </component>
</template>
