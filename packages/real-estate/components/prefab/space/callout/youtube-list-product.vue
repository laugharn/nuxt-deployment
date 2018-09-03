<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";
// import DiyPricing from "@core/components/diy/pricing.vue";
import DiyYoutube from "@core/components/diy/youtube.vue";

// Prefab
import callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

// Services
import productApi from "@core/assets/js/services/aceable/products";
import ultra from "@core/assets/js/services/ultra/content";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyList,
        // DiyPricing,
        DiyYoutube
    },

    computed: {
        defaultConfig() {
            return this.loading || !this.product
                ? this.loadingConfig
                : merge(this.baseConfig, {
                      button: {
                          buttonExtensionClasses: "btn-convert",
                          handleClick: async () => {
                              // await this.addToCart();
                              await this.$store.dispatch(
                                  "page/goTo",
                                  this.product.course_path
                              );
                          },
                          icon: "chevron-right",
                          id: this.id + "-button",
                          showIconAfter: true,
                          slot: "main-additional",
                          title: "Get My License"
                      },
                      list: {
                          icon: {
                              icon: "check"
                          },
                          id: this.id + "-list",
                          itemsBeforeExtensionClasses:
                              "mb-auto mr-2 mt-1 text-primary",
                          itemsItemExtensionClasses: "mb-2",
                          itemsShowBefore: true,
                          slot: "main-body",
                          unstyled: true
                      },
                      pricing: {
                          current:
                              "$" +
                              deepGet(
                                  this.product,
                                  "pricing.current",
                                  "product.pricing.current"
                              ),
                          id: this.id + "-pricing",
                          max:
                              "$" +
                              deepGet(
                                  this.product,
                                  "pricing.max",
                                  "product.pricing.max"
                              ),
                          pricingExtensionClasses: "pr-3",
                          slot: "main-additional"
                      },
                      space: {
                          asideExtensionClasses: "p-3",
                          id: this.id,
                          mainAdditionalExtensionClasses: "d-flex",
                          mainExtensionClasses: "p-3",
                          wrapperExtensionClasses: "py-3"
                      },
                      youtube: {
                          id: this.id + "-youtube",
                          slot: "aside"
                      }
                  });
        }
    },

    props: {
        configKey: {
            default: "spaces.youtube-list",
            type: String
        }
    },

    data() {
        return {
            loading: true,
            product: null
        };
    },

    extends: callout,

    methods: {
        async addToCart() {
            await this.$store.dispatch("cart/addProductsWithoutConflict", [
                this.product.product
            ]);

            await this.$store.dispatch("page/checkout");
        }
    },

    async mounted() {
        if (this.computedConfig.product_id) {
            let product, aceableProduct;

            [product, aceableProduct] = await Promise.all([
                ultra({
                    name: this.computedConfig.product_id.toLowerCase(),
                    post_type: "product"
                }),
                productApi([this.computedConfig.product_id]).then(
                    response => response[0]
                )
            ]);

            if (product) {
                product.product = aceableProduct;
                this.product = product;

                this.loading = false;
            }
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyList v-bind="computedConfig.list" />
        <!-- <DiyPricing v-bind="computedConfig.pricing" /> -->
        <DiyButton @click.prevent="computedConfig.button.handleClick() || $store.dispatch('page/goTo', computedConfig.button.href)" v-bind="computedConfig.button" />
        <DiyYoutube v-bind="computedConfig.youtube" />
    </DiySpace>
</template>
