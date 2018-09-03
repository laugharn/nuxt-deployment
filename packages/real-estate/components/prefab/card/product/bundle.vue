<script>
// Components
// Prefab
import Card from "./default.vue";

// Libraries
import merge from "lodash/merge";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    computed: {
        computedConfig() {
            return merge(this.baseConfig, {
                features: merge(
                    {},
                    {
                        icon: {
                            icon: "check",
                            iconExtensionClasses: "text-brand",
                            show: true
                        },
                        items: this.featuresItems
                            ? this.featureItems
                            : deepGet(this.cardContent, "card.features"),
                        itemsBeforeExtensionClasses: "mb-auto mr-1 mt-1",
                        itemsShowBefore: true,
                        slot: "main-body",
                        unstyled: true
                    },
                    this.features
                )
            });
        }
    },

    extends: Card,

    methods: {
        async addProducts(arr) {
            await this.$store.dispatch("cart/addProductsWithoutConflict", arr);

            if (this.$store.state.cart.conflict == null) {
                this.$store.dispatch("page/goTo", "/checkout/");
            }
        }
    },

    props: {
        buttonTitle: {
            default: "Start Today",
            type: String
        },

        features: {
            default: null,
            type: Object
        },

        featuresItems: {
            default: null,
            type: Array
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig.card">
        <DiyImage v-bind="computedConfig.image" />
        <DiyLink v-bind="computedConfig.title" />

        <DiyList v-bind="computedConfig.price" />
        <DiyList v-bind="computedConfig.features" />
        <DiyCollection v-bind="computedConfig.buttons">
            <DiyButton v-bind="item" slot-scope="item" />
        </DiyCollection>
    </DiyCard>
</template>
