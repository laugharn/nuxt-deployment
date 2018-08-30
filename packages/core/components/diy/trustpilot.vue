<script>
// Libraries
import loadjs from "loadjs";

// Mixins
import diy from "../mixins/diy";

/**
 * A Trustpilot widget
 * @since 1.0.0
 */
export default {
    computed: {
        computedTrustpilotClasses() {
            return [
                this.trustpilotClasses,
                this.trustpilotExtensionClasses,
                this.clickable ? "is-clickable" : "not-clickable"
            ];
        },

        widget() {
            let widgets = {
                carousel: {
                    height: "130px",
                    template: "53aa8912dec7e10d38f59f36"
                },

                grid: {
                    height: "500px",
                    template: "539adbd6dec7e10e686debee"
                },

                list: {
                    height: "500px",
                    template: "539ad60defb9600b94d7df2c"
                },

                "mini-carousel": {
                    height: "350px",
                    template: "539ad0ffdec7e10e686debd7"
                },

                quote: {
                    height: "300px",
                    template: "54d0e1d8764ea9078c79e6ee"
                },

                slider: {
                    height: "220px",
                    template: "54ad5defc6454f065c28af8b"
                }
            };

            return widgets[this.type];
        }
    },

    data() {
        return {
            loading: true
        };
    },

    mixins: [diy],

    async mounted() {
        if (!loadjs.isDefined("trustpilot")) {
            loadjs(
                [
                    "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                ],
                "trustpilot"
            );

            loadjs.ready("trustpilot", () => {
                this.loading = false;
            });
        }
    },

    name: "diy--trustpilot",

    props: {
        /**
         * The Trustpilot business unit
         */
        businessUnit: {
            default: process.env.TRUSTPILOT_BUSINESS_UNIT,
            type: String
        },

        clickable: {
            default: false,
            type: Boolean
        },

        /**
         * The URL for the Trustpilot widget link
         */
        href: {
            default: process.env.TRUSTPILOT_URL,
            type: String
        },

        /**
         * The ISO language locale
         */
        locale: {
            default: "en-US",
            type: String
        },

        /**
         * The schema.org type
         */
        schemaType: {
            default: "Organization",
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        /**
         * Should we show the SERP schema
         */
        showSchema: {
            default: true,
            type: Boolean
        },

        /**
         * A comma separated list of star ratings to display
         */
        stars: {
            default: "5",
            type: String
        },

        /**
         * The trustpilot theme
         */
        theme: {
            default: "light",
            type: String
        },

        trustpilotClasses: {
            default: "trustpilot-widget --default",
            type: String
        },

        trustpilotExtensionClasses: {
            default: null,
            type: String
        },

        /**
         * The Trustpilot widget type. See the widgets computed property
         */
        type: {
            default: "slider",
            type: String
        },

        /**
         * The component width as a percentage string
         */
        width: {
            default: "100%",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.trustpilot-widget {
    //

    &.not-clickable {
        &:after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
        }
    }
}
</style>

<template>
    <div
        :class="computedTrustpilotClasses"
        :data-locale="locale"
        :data-template-id="widget.template"
        :data-businessunit-id="businessUnit"
        :data-style-height="widget.height"
        :data-schema-type="showSchema == true ? schemaType : null"
        :data-style-width="width"
        :data-theme="theme"
        :data-stars="stars"
        :id="identify('trustpilot-widget')"
        v-if="show"
        v-show="!loading">
        <a :href="href" target="_blank">Trustpilot</a>
    </div>
</template>
