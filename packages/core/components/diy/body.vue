<script>
import Vue from "vue";

/**
 * A body that has been parsed for markdown and shortcode components
 * @since 1.0.0
 */
export default {
    computed: {
        computedBodyClasses() {
            return [this.bodyClasses, this.bodyExtensionClasses];
        }
    },

    data() {
        return {
            parentLoading: true
        };
    },

    mounted() {
        this.parentLoading = false;
    },

    name: "DiyBody",

    props: {
        /**
         * Classes that can be applied to the top level body div
         */
        bodyClasses: {
            default: "Body",
            type: String
        },

        bodyExtensionClasses: {
            default: "--default",
            type: String
        },

        /**
         * The parsed content to be rendered
         */
        content: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        }
    },

    render(h) {
        if (!this.content) {
            return false;
        }

        let shortcodes = {};
        let shortcodeComponents = this.content
            .match(/<(.|\n)*?>/g)
            .filter(component => component.startsWith("<Shortcode"))
            .map(component => component.slice(1, -1).split(" ")[0])
            .forEach(component => {
                let shortcode = component.split("Shortcode")[1].toLowerCase();
                shortcodes[component] = () =>
                    import(/* webpackChunkName: "shortcode" */ "../shortcode/" +
                        shortcode +
                        ".vue");
            });

        if (this.show == true) {
            if (this.parentLoading) {
                return h("div", {
                    domProps: {
                        innerHTML: this.content
                    }
                });
            } else {
                const component = Vue.component("tmp", {
                    components: {
                        ...shortcodes
                    },
                    data() {
                        return {
                            loading: true
                        };
                    },
                    mounted() {
                        this.loading = false;
                    },
                    template:
                        '<div class="' +
                        this.computedBodyClasses +
                        '" v-if="!loading">' +
                        this.content +
                        "</div>"
                });
                return h(component);
            }
        }

        return false;
    }
};
</script>
