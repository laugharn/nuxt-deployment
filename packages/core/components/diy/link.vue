<script>
import diy from "../mixins/diy";

/**
 * A link
 * @since 1.0.0
 */
export default {
    methods: {
        async handle() {
            if (!this.handleClick && !this.predefinedClickAction) {
                if (this.href) {
                    this.$store.dispatch("page/goTo", this.href);
                }
            } else if (this.handleClick) {
                this.handleClick();
            } else if (this.predefinedClickAction) {
                this.predefinedClickMethod();
            }
        },

        eventPageToggle() {
            this.$store.commit("page/toggleMenu");
        }
    },

    computed: {
        predefinedClickMethod() {
            if (this.predefinedClickAction == "page/toggleMenu") {
                return this.eventPageToggle;
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

        predefinedClickAction: {
            default: null,
            type: String
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
    <a :class="[linkClasses, linkExtensionClasses]" @click.prevent="handle()" :href="href" :id="id" v-html="content" v-if="show"><slot name="after"></slot></a>
</template>
