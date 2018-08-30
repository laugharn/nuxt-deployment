<script>
// Components
import DiyIcon from "./icon.vue";
import DiyImage from "./image.vue";

// Mixins
import diy from "../mixins/diy";

/**
 * A YouTube video
 * @since 1.0.0
 */
export default {
    components: {
        DiyIcon,
        DiyImage
    },

    computed: {
        computedBackgroundWrapperExtensionClasses() {
            return ["aspect-ratio", this.aspectRatioClasses];
        },

        computedCoverClasses() {
            return [this.coverClasses, this.coverExtensionClasses];
        },

        computedImageRemote() {
            return this.imageRemote
                ? this.imageRemote
                : this.imageSrc
                    ? false
                    : true;
        },

        computedImageSrc() {
            return this.imageSrc
                ? this.imageSrc
                : `https://img.youtube.com/vi/${this.src}/hqdefault.jpg`;
        },

        computedWrapperClasses() {
            return [this.wrapperClasses, this.wrapperExtensionClasses];
        },

        computedWrapperStyle() {
            return this.maxWidth ? "max-width: " + this.maxWidth + "px" : null;
        },

        computedYoutubeClasses() {
            // return [this.youtubeClasses, this.youtubeExtensionClasses];
            return "h-100 position-absolute w-100";
        }
    },

    data() {
        return {
            loading: true,
            embedLoaded: false
        };
    },

    methods: {
        async load() {
            const player = await import("youtube-player");
            let embed = player.default(this.id, {
                height: "100%",
                playerVars: this.youtubePlayerVars,
                videoId: this.src,
                width: "100%"
            });

            this.embedLoaded = true;

            await embed.playVideo();
        }
    },

    mixins: [diy],

    async mounted() {
        this.loading = false;

        if (this.autoplay) {
            await this.load();
        }
    },

    name: "DiyYoutube",

    props: {
        aspectRatioClasses: {
            default: "aspect-ratio-16by9",
            type: String
        },

        autoplay: {
            default: false,
            type: Boolean
        },

        coverClasses: {
            default: "Youtube__cover",
            type: String
        },

        coverExtensionClasses: {
            default: "--default",
            type: String
        },

        icon: {
            default() {
                return {
                    icon: "play",
                    iconExtensionClasses: "font-size-h1 m-auto"
                };
            },
            type: Object
        },

        imageRemote: {
            default: false,
            type: Boolean
        },

        imageSrc: {
            default: null,
            type: String
        },

        maxWidth: {
            default: null,
            type: [Number, String]
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * The YouTube video ID
         */
        src: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the top level item div
         */
        wrapperClasses: {
            default: "w-100",
            type: String
        },

        wrapperExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the div around the iframe
         */
        youtubeClasses: {
            default: "Youtube",
            type: String
        },

        youtubeExtensionClasses: {
            default: "--default",
            type: String
        },

        /**
         * An object of YouTube URL props
         */
        youtubePlayerVars: {
            default() {
                return {
                    iv_load_policy: 3,
                    rel: 0,
                    showinfo: 0
                };
            },
            type: Object
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.Youtube {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    &__cover {
        background-color: map-get($grays, 100);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
    }
}
</style>

<template>
    <div :class="computedWrapperClasses" :id="identify('wrapper')" :style="computedWrapperStyle" v-if="show && !loading">

        <a @click.prevent="load()" href="#" :id="identify('cover-link')" v-show="!embedLoaded">
            <DiyImage
                :background-wrapper-extension-classes="computedBackgroundWrapperExtensionClasses"
                :id="identify('cover')"
                :remote="computedImageRemote"
                :src="computedImageSrc"
                type="background"
            >
                <DiyIcon :id="identify('icon')" v-bind="icon" />
            </DiyImage>
        </a>

        <div :class="computedBackgroundWrapperExtensionClasses" v-show="embedLoaded">
            <div :class="computedYoutubeClasses" :id="id" style="top:0"></div>
        </div>
    </div>
</template>
