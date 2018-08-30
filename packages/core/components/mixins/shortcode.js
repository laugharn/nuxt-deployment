export default {
    props: {
        config: {
            default: null,
            type: Object
        },

        shortcodeClasses: {
            default: "d-flex py-3",
            type: String
        },

        shortcodeExtensionClasses: {
            default: "justify-content-center",
            type: String
        }
    }
};
