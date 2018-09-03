<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                button: {
                    block: true,
                    buttonExtensionClasses: "btn-convert btn-lg",
                    id: this.id + "-button",
                    slot: "main",
                    title: `Get My License <small class="fa fa-chevron-right"></small>`
                },

                space: {
                    asideExtensionClasses: "d-none",
                    id: this.id,
                    mainExtensionClasses: "col-md-4 col-12 m-auto"
                }
            };
        }
    },

    methods: {
        async addToCart() {
            await this.$store.dispatch("cart/addProducts", [
                this.$store.state.page.content.product.product
            ]);

            if (this.checkout) {
                await this.$store.dispatch("page/checkout");
            }
        }
    },

    mixins: [prefab],

    props: {
        checkout: {
            default: true,
            type: Boolean
        },

        id: {
            default: "button",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyButton @click.prevent="addToCart()" v-bind="computedConfig.button" />
    </DiySpace>
</template>
