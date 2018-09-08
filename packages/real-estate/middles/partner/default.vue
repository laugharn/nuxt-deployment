<script>
// Content
import base from "~/assets/js/content/bases/default";

// Libraries
import get from "lodash/get";

// Middles
import middle from "@core/middles/default";

// Services
import contentBuilder from "@core/assets/js/services/builders/content";
import ultraApi from "@core/assets/js/services/ultra/content";

// Utils
import pathUtil from "@core/assets/js/utils/path";

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
                      pagename: context.route.params.title,
                      post_type: "partner"
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
                template: content.template || "partner--default",
                templateData
            });
        } catch (error) {
            context.error({ statusCode: 404, message: "Page not found" });
        }
    },

    extends: middle
};
</script>
