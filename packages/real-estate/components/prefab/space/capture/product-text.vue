<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
// Prefab
import Capture from "./default.vue";

// Libraries
import merge from "lodash/merge";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyList
    },

    computed: {
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
                        },
                    },
                    show: true,
                    slot: "schema"
                },

                space: {
                    asideExtensionClasses:
                        "col-md-6 d-flex justify-content-end my-auto",
                    mainExtensionClasses:
                        "col-md-6 d-flex justify-content-center justify-content-md-start my-auto",
                    wrapperExtensionClasses: "capture-product-text py-3"
                },

                title: {
                    content: this.computedTitleContent,
                    markdownExtensionClasses: "d-none d-md-block",
                    slot: "aside"
                },

                text: {
                  content: "Sign up today!",
                  markdownExtensionClasses: "text-black"
                }
            });
        }
    },

    extends: Capture,

    methods: {
        async addToCart() {
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
        <div class="container">
          <div class="row justify-content-xl-center">
            <div class="d-none d-lg-block col-md-6 col-lg-5 capture-product-text__text">
              <DiyMarkdown v-bind="computedConfig.text"  />
            </div>
            <div class="col-12 col-md-6 col-lg-5 capture-product-text__callout">
              <ul class="list-inline mb-0">
                  <li class="capture-product-text__max-price list-inline-item text-line-through">
                      ${{ deepGet($store.state.page.content.product, 'pricing.max', 'product.pricing.max') }}
                  </li>
                  <li class="capture-product-text__current-price list-inline-item font-size-lg font-weight-bold">
                      ${{ deepGet($store.state.page.content.product, 'pricing.current', 'product.pricing.current') }}
                  </li>
                  <li class="capture-product-text__button list-inline-item">
                      <a class="btn btn-convert btn-lg" @click.prevent="addToCart()" href="#" v-html="computedConfig.form.buttonContent"></a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <DiyMarkdown v-bind="computedConfig.title" />
        <script type="application/ld+json" slot="schema" v-if="computedConfig.schema.show">
            {{ JSON.stringify(computedConfig.schema.content) }}
        </script>
    </DiySpace>
</template>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.capture-product-text {
  background-color: white;
}

.capture-product-text {
  .capture-product-text__text {
    .Markdown {
      float: left;
      font-size: 1.1rem;
      position: relative;
      top: 13px;
    }
  }
}

@include media-breakpoint-down(md) {
  .capture-product-text {
    .capture-product-text__text {
      .Markdown {
        top: 0px;
        margin-bottom: 30px;
      }
    }
  }
}

.capture-product-text {
  .capture-product-text__callout {
    ul {
      float: right;
    }
  }
}

@include media-breakpoint-down(md) {
  .capture-product-text {
    .capture-product-text__callout {
      padding-left: 20px;
      padding-right: 20px;
      ul {
        float: none;
      }
    }
  }
}

.capture-product-text {
  .capture-product-text__callout {
    .capture-product-text__max-price {
      color: map-get($grays, 1000);
      margin-right: 10px;
    }
  }
}

.capture-product-text {
  .capture-product-text__callout {
    .capture-product-text__current-price {
      position: relative;
      top: 2px;
      font-size: 32px;
    }
  }
}

.capture-product-text {
  .capture-product-text__callout {
    .capture-product-text__button {
      vertical-align: middle;
      float: right;
      .btn {
        padding: 0.7rem 1.5rem;
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .capture-product-text {
    .capture-product-text__callout {
      .capture-product-text__button {
        float: none;
      }
    }
  }
}
</style>
