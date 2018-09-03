<script>
// Components
// DIY
import DiyDrawer from "@core/components/diy/drawer.vue";
import DiyLink from "@core/components/diy/link.vue";

// Custom
import Cart from "~/components/custom/cart/default.vue";

// Libraries
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyDrawer,
        DiyLink,

        Cart
    },

    computed: {
        defaultConfig() {
            return {
                drawer: {
                    drawerExtensionClasses: "--right",
                    title: "Cart"
                }
            };
        },

        ...mapGetters({
            productList: "cart/productList"
        }),

        ...mapState({
            show: state => state.page.showCart
        })
    },

    mixins: [prefab]
};
</script>

<template>
    <DiyDrawer :show="show" v-bind="computedConfig.drawer">
        <Cart />
    </DiyDrawer>
</template>
