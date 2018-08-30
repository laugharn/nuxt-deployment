<script>
// Mixins
import diy from "../mixins/diy";

/**
 * A block of markdown to be parsed
 * @since 1.0.0
 */
export default {
    mixins: [diy],

    name: "DiyMarkdown",

    props: {
        /**
         * The parsed content to be rendered
         */
        content: {
            default: null,
            type: String
        },

        /**
         * Classes that can be applied to the top level div
         */
        markdownClasses: {
            default: "Markdown --default",
            type: String
        },

        markdownExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * Should we use the heavy, more opinionated Marked library
         */
        marked: {
            default: false,
            type: Boolean
        },

        show: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<template>
  <div :class="[markdownClasses, markdownExtensionClasses]" v-html="markdown(content, marked)" v-if="show">
  </div>
</template>
