<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCard from "@core/components/diy/card.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyLink from "@core/components/diy/link.vue";
import DiyList from "@core/components/diy/list.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyButton,
        DiyCard,
        DiyCollection,
        DiyImage,
        DiyLink,
        DiyList,
        DiyMarkdown
    },

    computed: {
        baseConfig() {
            let items = [];

            if (this.canLink) {
                items.push({
                    block: true,
                    buttonExtensionClasses: "btn-outline-primary",
                    event: async () => {
                        await this.$store.dispatch(
                            "page/goTo",
                            this.cardContent.course_path
                        );
                    },
                    title: "Learn More"
                });
            }

            return {
                buttons: {
                    collectionClasses: "form-row",
                    items: [
                        ...items,
                        {
                            block: true,
                            buttonExtensionClasses: "btn-convert",
                            event: async () => {
                                await this.addProducts([
                                    this.cardContent.product
                                ]);
                            },
                            show: this.showButton,
                            title: this.buttonTitle
                        }
                    ],
                    slot: "main-footer"
                },

                card: {
                    mainBodyExtensionClasses: "mb-2",
                    mainHeaderExtensionClasses: "mb-2"
                },

                description: {
                    content:
                        this.descriptionContent ||
                        deepGet(
                            this.cardContent,
                            this.usePlaceholder ? "card.placeholder" : "",
                            "card.description",
                            "seo.description",
                            "description"
                        ),
                    markdownExtensionClasses: "mb-3",
                    slot: "main-body"
                },

                image: {
                    backgroundWrapperExtensionClasses: "aspect-ratio-3by1",
                    params: "w=640&auto=compress",
                    slot: "header",
                    src:
                        deepGet(this.cardContent, "card.image", "image") ||
                        "/uploads/content/k7JdmEL3jlLJVzzaBlCzdDLx9XNl6C9u.jpg",
                    type: "background"
                },

                price: {
                    inline: true,
                    items: [
                        {
                            content:
                                "$" +
                                String(
                                    deepGet(
                                        this.cardContent,
                                        "pricing.max",
                                        "product.pricing.max"
                                    )
                                ),
                            contentExtensionClasses:
                                "text-secondary text-strike"
                        },
                        {
                            content:
                                "$" +
                                String(
                                    deepGet(
                                        this.cardContent,
                                        "pricing.current",
                                        "product.pricing.current"
                                    )
                                ),
                            contentExtensionClasses:
                                "font-size-lg font-weight-bold"
                        }
                    ],
                    listExtensionClasses: "mb-0",
                    slot: "main-header"
                },

                title: {
                    content:
                        this.titleContent ||
                        deepGet(this.cardContent, "card.title", "post_title"),
                    href: this.canLink
                        ? this.titleHref
                            ? this.titleHref
                            : this.cardContent.course_path
                        : "#",
                    linkExtensionClasses: this.titleLinkExtensionClasses,
                    slot: "main-header"
                }
            };
        },

        computedConfig() {
            return this.baseConfig;
        }
    },

    methods: {
        async addProducts(arr) {
            await this.$store.dispatch("cart/addProducts", arr);

            if (this.$store.state.cart.conflict == null) {
                this.$store.commit("page/toggleCart");
            }
        }
    },

    mixins: [prefab],

    props: {
        button: {
            default: null,
            type: Object
        },

        buttonTitle: {
            default: "Add to Cart",
            type: String
        },

        canLink: {
            default: true,
            type: Boolean
        },

        cardContent: {
            default: null,
            type: Object
        },

        configKey: {
            default: "card.product",
            type: String
        },

        descriptionContent: {
            default: null,
            type: String
        },

        showButton: {
            default: true,
            type: Boolean
        },

        titleContent: {
            default: null,
            type: String
        },

        titleHref: {
            default: null,
            type: String
        },

        titleLinkExtensionClasses: {
            default: "font-size-lg font-weight-bold",
            type: String
        },

        usePlaceholder: {
            default: false,
            type: Boolean
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig.card">
        <DiyImage v-bind="computedConfig.image" />
        <DiyLink v-bind="computedConfig.title" />

        <DiyList v-bind="computedConfig.price" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyCollection v-bind="computedConfig.buttons">
            <DiyButton v-bind="item" slot-scope="item" />
        </DiyCollection>
    </DiyCard>
</template>
