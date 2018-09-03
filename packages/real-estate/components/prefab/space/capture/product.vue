<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";

// Prefab
import Capture from "./default.vue";

// Libraries
import get from "lodash/get";
import merge from "lodash/merge";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyList
    },

    computed: {
        computedPricingCurrent() {
            let configCurrent = get(
                this.computedConfig,
                "product.pricing.current"
            );

            return configCurrent
                ? configCurrent
                : deepGet(
                      this.$store.state.page.content.product,
                      "pricing.current",
                      "product.pricing.current"
                  );
        },

        computedPricingMax() {
            let configMax = get(this.computedConfig, "product.pricing.max");

            return configMax
                ? configMax
                : deepGet(
                      this.$store.state.page.content.product,
                      "pricing.max",
                      "product.pricing.max"
                  );
        },

        computedTitleContent() {
            let courseCount =
                deepGet(
                    this.$store.state.page.content,
                    "product.course_count"
                ) || null;
            let approvalNumber =
                deepGet(
                    this.$store.state.page.content,
                    "product.approval.number"
                ) || null;
            let duration =
                deepGet(this.$store.state.page.content, "product.duration") ||
                null;

            return (
                (courseCount ? courseCount + " Courses &nbsp;" : "") +
                duration +
                " Hours &nbsp;" +
                " #" +
                approvalNumber
            );
        },

        defaultConfig() {
            return merge(this.baseConfig, {
                coupon_code: null,

                product: {},

                schema: {
                    content: {
                        description: deepGet(
                            this.$store.state.page.content,
                            "product.card.description",
                            "seo.description"
                        ),
                        image: this.imgix(
                            deepGet(this.$store.state.page.content, "image") ||
                                process.env.IMAGE,
                            {
                                auto: "compress",
                                w: 640
                            }
                        ),
                        name: deepGet(
                            this.$store.state.page.content,
                            "product.title"
                        ),
                        offers: {
                            "@type": "Offer",
                            price: deepGet(
                                this.$store.state.page.content,
                                "product.pricing.current",
                                "product.product.pricing.current"
                            ).toFixed(2),
                            priceCurrency: "USD"
                        }
                    },
                    show: true,
                    slot: "schema"
                },

                space: {
                    asideExtensionClasses:
                        "col-md-6 d-flex justify-content-end my-auto",
                    mainExtensionClasses:
                        "col-md-6 d-flex justify-content-center justify-content-md-start my-auto"
                },

                title: {
                    content: this.computedTitleContent,
                    markdownExtensionClasses: "d-none d-md-block",
                    slot: "aside"
                }
            });
        }
    },

    extends: Capture,

    methods: {
        async addToCart() {
            if (this.computedConfig.coupon_code) {
                await this.$store.dispatch(
                    "cart/addCoupon",
                    this.computedConfig.coupon_code
                );
            }

            await this.$store.dispatch("cart/addProductsWithoutConflict", [
                this.$store.state.page.content.product.product
            ]);

            await this.$store.dispatch("page/checkout");
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <ul class="list-inline mb-0" slot="main">
            <li class="list-inline-item text-line-through text-secondary">
                ${{ computedPricingMax }}
            </li>
            <li class="list-inline-item font-size-lg font-weight-bold">
                ${{ computedPricingCurrent }}
            </li>
            <li class="list-inline-item">
                <a class="btn btn-convert btn-lg" @click.prevent="addToCart()" href="#" v-html="computedConfig.form.buttonContent"></a>
            </li>
        </ul>

        <DiyMarkdown v-bind="computedConfig.title" />

        <script type="application/ld+json" slot="schema" v-if="computedConfig.schema.show">
            {{ JSON.stringify(computedConfig.schema.content) }}
        </script>
    </DiySpace>
</template>
