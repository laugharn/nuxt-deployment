import merge from "lodash/merge";

export default (baseContent, content = null, variantKey = "no-variant") => {
    let variant = content.variants ? content.variants[variantKey] : {};
    let response = merge({}, baseContent, content, variant);

    return {
        content: response,
        contentParts: {
            content: content,
            default: baseContent,
            variant: variant
        }
    };
};
