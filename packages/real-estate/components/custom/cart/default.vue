<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";

// Libraries
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton
    },

    computed: {
        ...mapGetters({
            couponList: "cart/couponList",
            grossDiscount: "cart/grossDiscount",
            productList: "cart/productList",
            subtotal: "cart/subtotal",
            total: "cart/total"
        }),

        ...mapState({
            error: state => state.cart.error,
            show: state => state.page.showCart
        })
    },

    data() {
        return {
            couponCode: null
        };
    },

    methods: {
        async addCoupon() {
            await this.$store
                .dispatch("cart/addCoupon", this.couponCode)
                .then(() => {
                    this.couponCode = null;
                });
        }
    }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

#livechat-compact-container {
    z-index: 999 !important;
}
@include media-breakpoint-up(md) {
    #livechat-compact-container,
    #livechat-full {
        left: 20px !important;
        right: auto !important;
    }
}
</style>

<template>
    <div class="d-flex flex-column flex-grow-1">
        <div class="border-bottom border-light d-md-block p-2" v-if="productList.length > 0">
            <DiyButton :block="true" button-extension-classes="btn-convert" @click.prevent="$store.dispatch('page/checkout')" title="Checkout" />
        </div>
        <div class="d-flex flex-column flex-grow-1" style="overflow-y:scroll">
            <div class="p-2" v-if="productList.length == 0">
                You currently have no items in your cart.
            </div>

            <div class="d-flex font-size-sm" :key="index" v-for="(product, index) in productList" v-if="productList.length > 0">
                <div class="p-2">
                    <a class="text-light" @click.prevent="$store.dispatch('cart/removeProduct', product)" href="#"><i class="fas fa-trash"></i></a>
                </div>
                <div class="flex-grow-1 px-1 py-2">
                    {{ product.title }}
                </div>
                <div class="font-weight-bold p-2">
                    ${{ product.product.pricing.current }}
                </div>
            </div>
        </div>
        <div class="border-top border-light px-2 py-1" v-if="productList.length > 0">
            <div class="d-flex font-size-xs" :key="index" v-for="(coupon, index) in couponList" v-if="couponList.length > 0">
                <div class="p-2">
                    <a class="text-light" @click.prevent="$store.dispatch('cart/removeCoupon', coupon)" href="#"><i class="fas fa-trash"></i></a>
                </div>
                <div class="flex-grow-1 font-italic py-2 text-notice">
                    Coupon {{ coupon.code }} applied ({{ coupon.offPercent * 100 }}% OFF)
                </div>
            </div>

            <div class="alert alert-danger font-size-xs mb-1" v-if="error" v-html="error"></div>

            <div class="form-row" v-if="couponList.length == 0">
                <div class="col">
                    <input class="form-control" placeholder="Coupon Code" type="text" v-model="couponCode">
                </div>
                <div class="col-auto">
                    <a class="btn btn-primary" @click.prevent="$store.dispatch('cart/addCoupon', couponCode)" href="#">Apply Now</a>
                </div>
            </div>
        </div>
        <div class="border-top border-light p-2" v-if="productList.length > 0">
            <div class="font-size-xs form-row pb-1 text-secondary" v-if="couponList.length > 0">
                <div class="col d-flex justify-content-start">
                    Subtotal
                </div>
                <div class="col d-flex justify-content-end">
                    ${{ subtotal.toFixed(2) }}
                </div>
            </div>
            <div class="font-size-xs form-row pb-1" v-if="couponList.length > 0 && grossDiscount">
                <div class="col d-flex justify-content-start text-secondary">
                    Coupon Discount
                </div>
                <div class="col d-flex justify-content-end text-notice">
                    -${{ grossDiscount.toFixed(2) }}
                </div>
            </div>
            <div class="font-size-sm form-row pb-2">
                <div class="col d-flex justify-content-start">
                    Total
                </div>
                <div class="col d-flex font-weight-bold justify-content-end">
                    ${{ total.toFixed(2) }}
                </div>
            </div>
            <DiyButton :block="true" button-extension-classes="btn-convert" @click.prevent="$store.dispatch('page/checkout')" title="Checkout" />
        </div>
    </div>
</template>
