<script>
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
            sitelinkContent,
            template,
            templateData,
            ultraContent;

        try {
            ultraContent = context.route.params.sitelink
                ? await ultraApi({
                      pagename: context.route.params.title,
                      post_type: "lp"
                  })
                : context.payload
                    ? context.payload
                    : await ultraApi({
                          pagename: context.route.params.title,
                          post_type: "lp"
                      });

            if (ultraContent.product_id) {
                [aceableProduct, product, sitelinkContent] = await Promise.all([
                    // The Aceable product
                    productsApi({
                        productIdList: [ultraContent.product_id]
                    }).then(response => response[0]),

                    // The name (slug) of the marketing product is the product ID, lowercase
                    ultraApi({
                        name: ultraContent.product_id.toLowerCase(),
                        post_type: "product"
                    }),

                    context.route.params.sitelink
                        ? context.payload
                            ? context.payload
                            : ultra({
                                  pagename: pathUtil(
                                      context.route.path,
                                      "/lp/"
                                  ),
                                  post_type: "lp"
                              })
                        : null
                ]);

                // Nest the aceable product in the marketing product
                product.product = aceableProduct;

                // Attach the product to the page content
                ultraContent.product = product;
            } else {
                sitelinkContent = context.route.params.sitelink
                    ? context.payload
                        ? context.payload
                        : ultra({
                              pagename: pathUtil(context.route.path, "/lp/"),
                              post_type: "lp"
                          })
                    : null;
            }

            baseContent = await import("~/assets/js/content/bases/" +
                (ultraContent.base || "default")).then(
                response => response.default
            );

            ultraContent = { ...ultraContent, ...sitelinkContent };

            ({ content, contentParts } = contentBuilder(
                baseContent,
                ultraContent,
                context.query.variant
            ));

            context.store.commit("page/mutate", {
                content,
                contentParts,
                path: context.route.path,
                template: content.template || "lp--default",
                templateData
            });
        } catch (error) {
            context.error({ statusCode: 404, message: "Page not found" });
        }
    },

    extends: middle
};
</script>
