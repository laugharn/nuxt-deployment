// Extends
import diy from "./diy";

// Libraries
import merge from "lodash/merge";

// Utils
import removeEmpty from "../../assets/js/utils/removeEmpty";

export default {
    computed: {
        computedConfig() {
            return this.configure();
        },

        computedQuery() {
            return this.configureQuery();
        },

        defaultConfig() {
            return {};
        },

        defaultQuery() {
            return {};
        }
    },

    extends: diy,

    methods: {
        configure() {
            let values = [
                this.get(
                    this.$store.state.page,
                    `contentParts.default.${this.configKey}`,
                    null
                ),
                this.defaultConfig,
                this.config,

                this.get(
                    this.$store.state.page,
                    `contentParts.content.${this.configKey}`,
                    null
                ),
                this.get(
                    this.$store.state.page,
                    `contentParts.variant.${this.configKey}`,
                    null
                )
            ];

            let merged = {};

            values.forEach(value => {
                if (typeof value === "object") {
                    merged = merge(merged, removeEmpty(value));
                }
            });

            return merged;
        },

        configureQuery() {
            return merge(this.defaultQuery, this.query);
        }
    },

    props: {
        config: {
            default: null,
            type: Object
        },

        configKey: {
            default: null,
            type: String
        },

        query: {
            default: null,
            type: Object
        }
    }
};
