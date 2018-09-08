<script>
// Content
import base from "~/assets/js/content/bases/default";

// Middles
import middle from "../default";

// Services
import contentBuilder from "../../assets/js/services/builders/content";
import ultraApi from "../../assets/js/services/ultra/content";

// Utils
import pathUtil from "../../assets/js/utils/path";

export default {
    async asyncData(context) {
        let aceableProduct,
            baseContent,
            content,
            contentParts,
            template,
            templateData,
            ultraContent;

        try {
            ultraContent = context.payload
                ? context.payload
                : await ultraApi({
                      name: pathUtil(context.route.path, "/whitepapers/"),
                      post_type: "whitepaper"
                  });

            baseContent = await import("~/assets/js/content/bases/" +
                (ultraContent.base || "default")).then(
                response => response.default
            );

            ({ content, contentParts } = contentBuilder(
                baseContent,
                ultraContent,
                context.query.variant
            ));

            context.store.commit("page/mutate", {
                content,
                contentParts,
                path: context.route.path,
                template: content.template || "whitepaper--default",
                templateData
            });
        } catch (error) {
            context.error({ statusCode: 404, message: "Page not found" });
        }
    },

    extends: middle
};
</script>
