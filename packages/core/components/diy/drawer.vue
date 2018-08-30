<script>
// Components
// DIY
import DiyIcon from "./icon.vue";

// Libraries
import { directive as onClickaway } from "vue-clickaway";

// Mixins
import diy from "../mixins/diy";

export default {
    components: {
        DiyIcon
    },

    directives: {
        onClickaway
    },

    methods: {
        async dismiss() {
            if (this.dismissalCallback) {
                await this.dismissalCallback();
            } else {
                this.$store.commit("page/toggleCart");
            }
        }
    },

    mixins: [diy],

    name: "DiyDrawer",

    props: {
        bodyClasses: {
            default: "Drawer__body",
            type: String
        },

        bodyExtensionClasses: {
            default: "--default",
            type: String
        },

        controlClasses: {
            default: "Drawer__header-control",
            type: String
        },

        controlExtensionClasses: {
            default: "--default",
            type: String
        },

        dismissalCallback: {
            default: null,
            type: Function
        },

        drawerClasses: {
            default: "Drawer",
            type: String
        },

        drawerExtensionClasses: {
            default: "--default",
            type: String
        },

        headerClasses: {
            default: "Drawer__header",
            type: String
        },

        headerExtensionClasses: {
            default: "--default",
            type: String
        },

        icon: {
            default() {
                return {
                    icon: "times"
                };
            },
            type: Object
        },

        show: {
            default: true,
            type: Boolean
        },

        showBody: {
            default: true,
            type: Boolean
        },

        showControl: {
            default: true,
            type: Boolean
        },

        showDrawer: {
            default: true,
            type: Boolean
        },

        showHeader: {
            default: true,
            type: Boolean
        },

        showTitle: {
            default: true,
            type: Boolean
        },

        title: {
            default: null,
            type: String
        },

        titleClasses: {
            default: "Drawer__header-title",
            type: String
        },

        titleExtensionClasses: {
            default: "--default",
            type: String
        },

        wrapperClasses: {
            default: "Drawer__wrapper",
            type: String
        },

        wrapperExtensionClasses: {
            default: "--default",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.Drawer {
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
    width: 310px;

    &.\--left {
        &:before {
            background-image: linear-gradient(
                90deg,
                rgba(map-get($grays, 600), 0.125),
                rgba(map-get($grays, 600), 0)
            );
            content: "";
            height: 100%;
            position: absolute;
            right: -($spacer / 2);
            top: 0;
            width: ($spacer / 2);
        }
    }

    &.\--right {
        margin-left: auto;

        &:before {
            background-image: linear-gradient(
                90deg,
                rgba(map-get($grays, 600), 0),
                rgba(map-get($grays, 600), 0.125)
            );
            content: "";
            height: 100%;
            position: absolute;
            left: -($spacer / 2);
            top: 0;
            width: ($spacer / 2);
        }
    }

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    &__header {
        background-color: map-get($grays, 100);
        display: flex;
        font-size: map-get($headings-font-sizes, h4);
        font-weight: $headings-font-weight;
        line-height: $headings-line-height;

        &:not(:empty) {
            padding: $spacer;
        }

        &-control {
            margin-left: auto;
            padding-left: $spacer;
        }

        &-link {
            line-height: $headings-line-height;
            margin: auto auto auto $spacer;
            font-size: $font-size-xs;
        }
    }

    &__loader {
        animation-duration: 1536ms;
        animation-iteration-count: infinite;
        animation-name: pulse;
        animation-timing-function: linear;
        margin: auto;

        &-wrapper {
            background-color: rgba(white, $modal-backdrop-opacity);
            display: flex;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            z-index: $zindex-sticky + 2;
        }
    }

    &__wrapper {
        background-color: rgba(
            map-get($theme-colors, dark),
            $modal-backdrop-opacity
        );
        display: flex;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: $zindex-sticky + 1;
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>

<template>
    <div :class="[wrapperClasses, wrapperExtensionClasses]" :id="identify('wrapper')" v-if="show">
        <div :class="[drawerClasses, drawerExtensionClasses]" :id="id" v-if="showDrawer" v-on-clickaway="dismiss">
            <slot name="drawer">
                <div :class="[headerClasses, headerExtensionClasses]" :id="identify('header')" v-if="showHeader">
                    <span :class="[titleClasses, titleExtensionClasses]" :id="identify('header-title')" v-if="title" v-show="showTitle">
                        {{ title }}
                    </span>
                    <a :class="[controlClasses, controlExtensionClasses]" @click.prevent="dismiss()" href="#" v-if="showControl">
                        <DiyIcon v-bind="icon" />
                    </a>
                </div>
                <div :class="[bodyClasses, bodyExtensionClasses]" :id="identify('body')" v-if="showBody">
                    <slot>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>
