<script>
// Components
import DiyBadge from "./badge.vue";

// Mixins
import diy from "../mixins/diy";

/**
 * A nav item
 * @since 1.0.0
 */
export default {
    components: {
        DiyBadge
    },

    computed: {
        computedIconClasses() {
            return [this.iconType, "fa-" + this.icon];
        },

        computedItemClasses() {
            let classes = [];

            if (this.showOnMobile == true) {
                classes.push("--show-on-mobile");
            }

            if (this.showTitleOnMobile == true) {
                classes.push("--show-title-on-mobile");
            }

            return [
                this.itemClasses,
                this.itemExtensionClasses,
                classes.join(" ")
            ];
        }
    },

    methods: {
        /**
         * Handles the item click event
         * @param {function} event
         * @return {void}
         * @public
         */
        handleClick(event) {
            this.$emit("click", event);
        }
    },

    mixins: [diy],

    name: "DiyNavItem",

    props: {
        afterClasses: {
            default: "NavItem__after --default",
            type: String
        },

        afterExtensionClasses: {
            default: null,
            type: String
        },

        badge: {
            default: null,
            type: Object
        },

        beforeClasses: {
            default: "NavItem__after --default",
            type: String
        },

        beforeExtensionClasses: {
            default: null,
            type: String
        },

        contentClasses: {
            default: "NavItem__content --default",
            type: String
        },

        contentExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The event for the item on click
         */
        event: {
            default: null,
            type: Function
        },

        /**
         * The href for the item
         */
        href: {
            default: "#",
            type: String
        },

        icon: {
            default: null,
            type: String
        },

        iconClasses: {
            default: "NavItem__icon --default",
            type: String
        },

        iconExtensionClasses: {
            default: null,
            type: String
        },

        iconType: {
            default: "fa",
            type: String
        },

        /**
         * Classes that can be applied to the top level div
         */
        itemClasses: {
            default: "NavItem --default",
            type: String
        },

        itemExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Should we show the entire component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show an icon
         */
        showIcon: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show this item on mobile
         */
        showOnMobile: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show the title text
         */
        showTitle: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the title text on mobile
         */
        showTitleOnMobile: {
            default: false,
            type: Boolean
        },

        /**
         * The title of the item
         */
        title: {
            default: null,
            type: String
        },

        titleClasses: {
            default: "NavItem__title --default",
            type: String
        },

        titleExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The type of wrapper element
         */
        type: {
            default: "a",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.NavItem {
    display: flex;

    &__after {
        &.\--default {
            margin-bottom: auto;
            margin-top: auto;

            &:not(:empty) {
                padding-left: ($spacer / 3);
            }
        }
    }

    &__before {
        &.\--default {
            margin-bottom: auto;
            margin-top: auto;

            &:not(:empty) {
                padding-right: ($spacer / 3);
            }
        }
    }

    &__content {
        &.\--default {
            margin-bottom: auto;
            margin-top: auto;
        }
    }
}
</style>

<template>
    <component :class="computedItemClasses" @click.prevent="handleClick" :href="href" :id="id" :is="type" v-if="show">
        <slot>
            <div :class="[beforeClasses, beforeExtensionClasses]" :id="identify('before')">
                <slot name="before">
                    <span :class="[iconClasses, iconExtensionClasses]" :id="identify('icon')" v-if="icon" v-show="showIcon">
                        <i :class="computedIconClasses"></i>
                    </span>
                </slot>
            </div>
            <div :class="[contentClasses, contentExtensionClasses]" :id="identify('content')">
                <slot name="title">
                    <span :class="[titleClasses, titleExtensionClasses]" :id="identify('title')" v-html="markdown(title)" v-if="title" v-show="showTitle"></span>
                </slot>
            </div>
            <div :class="[afterClasses, afterExtensionClasses]" :id="identify('after')">
                <slot name="after">
                    <DiyBadge :id="identify('badge')" v-bind="badge" v-if="badge" />
                </slot>
            </div>
        </slot>
    </component>
</template>
