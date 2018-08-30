// Libraries
import lodashGet from "lodash/get";
import marked from "marked";
import unescape from "lodash/unescape";

// Services
import imageBuilder from "../../assets/js/services/builders/image";

// Utilities
import deepGet from "../../assets/js/utils/deepGet";
import isJson from "../../assets/js/utils/isJson";
import rand from "../../assets/js/utils/rand";

/**
 * @mixin
 */
export default {
    methods: {
        /**
         * Makes a deep get available in the template
         * @param {object} object
         * @param {string} key
         * @public
         */
        deepGet(object, ...keys) {
            return deepGet(object, ...keys);
        },

        /**
         * Makes Lodash get available in the template
         * @param {object} object
         * @param {string} key
         * @public
         */
        get(object, key, fallback = null) {
            return lodashGet(object, key, fallback);
        },

        /**
         * Appends suffixes to the component ID
         * @param {string} suffix
         * @public
         * @returns {string}
         */
        identify(suffix) {
            return `${this.id}-${suffix}`;
        },

        /**
         * Generates an Imgix URL for S3-hosted assets
         * @param {string} url
         * @param {object} params
         * @returns {string}
         * @public
         */
        imgix(url, params = null) {
            return imageBuilder(url, params);
        },

        /**
         * Returns rendered HTML from Markdown
         * @param {string} value
         * @param {boolean} useMarked
         * @returns {string}
         * @public
         */
        markdown(value, useMarked = false) {
            return !value
                ? value
                : useMarked
                    ? marked(value)
                    : this.unescape(marked.inlineLexer(value, []));
        },

        /**
         * Parses a JSON string
         * @param {string} value
         * @returns {(object|string)}
         * @public
         */
        parse(value) {
            return isJson(value) ? JSON.parse(value) : value;
        },

        /**
         * Unescapes a string
         * @param {string} value
         * @returns {string}
         * @public
         */
        unescape(value) {
            return unescape(value);
        }
    },

    props: {
        /**
         * A unique ID for the component
         * @type {string}
         */
        id: {
            default() {
                return rand(12);
            },
            type: String
        }
    }
};
