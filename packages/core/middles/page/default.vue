<script>
// Content
import base from "~/assets/js/content/bases/default";

// Libraries
import get from "lodash/get";

// Middles
import middle from "../default";

// Services
import contentBuilder from "../../assets/js/services/builders/content";
import productsApi from "../../assets/js/services/aceable/products";
import ultraApi from "../../assets/js/services/ultra/content";

// Utils
import pathUtil from "../../assets/js/utils/path";

export default {
    async asyncData(context) {
        let baseContent,
            content,
            contentParts,
            template,
            templateData,
            ultraContent;

        try {
            ultraContent = context.payload
                ? context.payload
                : await ultraApi({
                      pagename: pathUtil(context.route.path, "/") || "home",
                      type: "page"
                  });

            if (ultraContent.product_id) {
                [product, aceableProduct] = await Promise.all([
                    // The name (slug) of the marketing product is the product ID, lowercase
                    ultraApi({
                        name: ultraContent.product_id.toLowerCase(),
                        post_type: "product"
                    }),

                    // The Aceable product
                    productsApi([ultraContent.product_id]).then(
                        response => response[0]
                    )
                ]);

                // Nest the aceable product in the marketing product
                product.product = aceableProduct;

                // Attach the product to the page content
                ultraContent.product = product;
            }

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
                template: "page--checkout-default",
                templateData
            });
        } catch (error) {
            console.log(error);

            context.error({ statusCode: 404, message: "Page not found" });
        }
    },

    extends: middle
};
</script>
