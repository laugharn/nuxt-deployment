<script>
import diy from "../mixins/diy";

/**
 * A link
 * @since 1.0.0
 */
export default {
    methods: {
        async handle() {
            if (!this.handleClick) {
                if (this.href) {
                    this.$store.dispatch("page/goTo", this.href);
                }
            } else {
                this.handleClick();
            }
        }
    },

    mixins: [diy],

    name: "DiyLink",

    props: {
        content: {
            default: null,
            type: String
        },

        handleClick: {
            default: null,
            type: Function
        },

        href: {
            default: "#",
            type: String
        },

        linkClasses: {
            default: "Link --default",
            type: String
        },

        linkExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        }
    }
};
</script>

<template>
    <a :class="[linkClasses, linkExtensionClasses]" @click.prevent="handle()" :href="href" :id="id" v-html="content" v-if="show"></a>
</template>
