<script>
// Mixins
import diy from "../mixins/diy";

/**
 * An individual item in an accordion
 * @since 1.0.0
 */
export default {
    computed: {
        /**
         * Computes what icon should be shown based on the isToggled boolean
         * @public
         */
        computedIconClasses() {
            return [
                this.iconClasses,
                this.iconExtensionClasses,
                this.iconType,
                this.showToggleIcons ? "showIconRight" : "",
                this.isToggled ? "fa-" + this.iconClose : "fa-" + this.iconOpen
            ];
        },

        /**
         * Computes what the text should be shown based on the isToggled boolean
         * @public
         */
        computedToggledText() {
            return this.isToggled ? this.toggleTextLess : this.toggleTextMore;
        },

        /**
         * Computes what the text should be shown based on the isToggled boolean
         * @public
         */
        computedToggleTextOrIcon() {
            return this.showToggleIcons ? "showToggleIcons" : "showToggleText";
        }
    },

    data() {
        return {
            // The toggle value of the item
            isToggled:
                this.initiallyToggled !== null ? this.initiallyToggled : false
        };
    },

    methods: {
        /**
         * Toggles the description
         * @public
         */
        toggle() {
            this.isToggled = !this.isToggled;
        }
    },

    mixins: [diy],

    name: "DiyAccordionItem",

    props: {
        /**
         * The content of the item, markdown rendered and visible when the item is open
         */
        description: {
            default: null,
            type: String
        },

        /**
         * Default classes on the description text
         */
        descriptionClasses: {
            default: "AccordionItem__description --default",
            type: String
        },

        /**
         * Classes that can be applied to the description text
         */
        descriptionExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the header div
         */
        headerClasses: {
            default:
                "AccordionItem__header --default d-flex justify-content-between align-items-center",
            type: String
        },

        /**
         * Classes that can be applied to the header div
         */
        headerExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the icon
         */
        iconClasses: {
            default: "AccordionItem__header-icon --default",
            type: String
        },

        /**
         * Classes that can be applied to the icon
         */
        iconExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The Font Awesome icon name for the close toggle
         */
        iconClose: {
            default: "minus",
            type: String
        },

        /**
         * The Font Awesome icon name for the open toggle
         */
        iconOpen: {
            default: "plus",
            type: String
        },

        /**
         * The Font Awesome icon family for the icons
         */
        iconType: {
            default: "fa",
            type: String
        },

        /**
         * Position icon on left
         */
        iconLeft: {
            default: false,
            type: Boolean
        },

        /**
         * Position icon on right
         */
        iconRight: {
            default: true,
            type: Boolean
        },

        /**
         * If the item should toggled by default
         */
        initiallyToggled: {
            default: null,
            type: Boolean
        },

        /**
         * Default classes on the top level item div
         */
        itemClasses: {
            default: "AccordionItem --default",
            type: String
        },

        /**
         * Classes that can be applied to the top level item div
         */
        itemExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * If we are showing the number on the accordion, this is the item's number count.
         */
        number: {
            default: null,
            type: Number
        },

        /**
         * Should we show the component
         */
        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the toggle on the right as icons
         */
        showToggleIcons: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show the numbers
         */
        showNumber: {
            default: false,
            type: Boolean
        },

        /**
         * Should we show the toggle on the right as text
         */
        showToggleText: {
            default: true,
            type: Boolean
        },

        /**
         * The title, visible when the item is collapsed
         */
        title: {
            default: null,
            type: String
        },

        /**
         * Default classes on the title
         */
        titleClasses: {
            default: "AccordionItem__header-title --default my-auto",
            type: String
        },

        /**
         * Classes that can be applied to the title
         */
        titleExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the toggles
         */
        toggleClasses: {
            default: "AccordionItem__header-toggle --default",
            type: String
        },

        /**
         * Classes that can be applied to the toggles
         */
        toggleExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Default classes on the toggle text
         */
        toggleTextClasses: {
            default: "AccordionItem__header-text --default my-auto",
            type: String
        },

        /**
         * Classes that can be applied to the toggle text
         */
        toggleTextExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Show more text
         */
        toggleTextMore: {
            default: "show more",
            type: String
        },

        /**
         * Show Less text
         */
        toggleTextLess: {
            default: "show less",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.AccordionItem {
    border-bottom: 1px solid;
    padding-top: $spacer;

    &__description {
        padding-bottom: $spacer;
    }

    &__header {
        color: map-get($theme-colors, "primary");
        cursor: pointer;
        display: block;
        padding-bottom: $spacer;

        &-toggle {
            display: flex;
            justify-content: space-between;
        }

        &-text {
            display: none;
            @include media-breakpoint-up(md) {
                display: block;
            }
        }

        i {
            display: block;
            @include media-breakpoint-up(md) {
                display: none;
            }
        }

        .showToggleText &-text {
            display: block;
            @include media-breakpoint-down(md) {
                display: none;
            }
        }
        .showToggleText i {
            display: none;
            @include media-breakpoint-down(md) {
                display: block;
            }
        }

        .showToggleIcons &-text {
            display: none;
        }
        .showToggleIcons i {
            display: block;
            @include media-breakpoint-down(md) {
                display: none;
            }
        }

        &-title {
            font-weight: $headings-font-weight;
            margin-bottom: 0;
            text-align: left;
        }
    }
}
</style>

<template>
  <div :class="[itemClasses, itemExtensionClasses]" :id="id" v-if="show">
    <div class="wrapper d-flex align-items-stretch">
      <div class="left" :class="{ 'mr-4' : iconLeft || showNumber }">
        <div :class="[toggleClasses, toggleExtensionClasses]" :id="identify('header-toggle')" @click="toggle()">
          <i v-if="iconLeft" :class="computedIconClasses" :id="identify('header-icon')"></i>
          <div :id="identify('header-number')" class="number mt-1" v-if="showNumber">{{ number }}</div>
        </div>
      </div>
      <div class="right w-100">
        <div :class="[headerClasses, headerExtensionClasses, { 'pb-0' : isToggled } ]" @click="toggle()" :id="identify('header')">
          <div :class="[titleClasses, titleExtensionClasses]" :id="identify('header-title')" v-html="markdown(title)" v-if="title"></div>
            <div class="toggleRight" :class="computedToggleTextOrIcon">
            <i v-if="iconRight" :class="computedIconClasses" :id="identify('header-icon')"></i>
            <div :class="[toggleTextClasses, toggleTextExtensionClasses]">{{ computedToggledText }}</div>
          </div>
        </div>
        <div :class="[descriptionClasses, descriptionExtensionClasses]" :id="identify('description')" v-html="markdown(description, true)" v-if="description" v-show="isToggled"></div>
      </div>
    </div>
  </div>
</template>
