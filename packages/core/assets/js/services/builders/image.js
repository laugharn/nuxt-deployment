import qs from "query-string";

export default (url = null, params = null) => {
    return (
        process.env.IMGIX_DOMAIN +
        (url
            ? url.replace(process.env.IMGIX_BUCKET, "")
            : process.env.IMGIX_DEFAULT_IMAGE) +
        (params ? "?" + qs.stringify(params) : "")
    );
};
