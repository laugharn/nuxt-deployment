<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyImage from "@core/components/diy/image.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Libraries
import { mapGetters, mapState } from "vuex";

// Utils
import price from "@core/assets/js/utils/price";

export default {
    components: {
        // DIY
        DiyButton,
        DiyHeading,
        DiyImage
    },

    computed: {
        computedSeal() {
            return process.env.PRODUCTION_URL == "www.aceableagent.com"
                ? "https://ace.imgix.net/uploads/sites/3/2018/05/guarantee.png"
                : this.get(this.product, "product.asset.seal") + "web.svg";
        },

        ...mapGetters({
            couponList: "cart/couponList",
            product: "cart/product",
            subtotal: "cart/subtotal"
        }),

        ...mapState({
            invoice: state => state.cart.invoice
        })
    },

    data() {
        return {
            applyCoupon: false,
            couponCode: null,
            couponError: null,
            isApplying: false
        };
    },

    methods: {
        async apply() {
            this.isApplying = true;

            await this.$store
                .dispatch("cart/addCoupon", this.couponCode)
                .then(() => {
                    this.couponError = null;
                })
                .catch(error => {
                    this.couponError = error.response.data.errorList[0].message;
                })
                .finally(() => {
                    this.isApplying = false;
                });
        },

        price(value) {
            return price(value);
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "product-review",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.Review {
    padding: $spacer;
}
</style>

<template>
    <div class="Review" v-if="invoice && product">
        <DiyHeading content="Review items" heading-extension-classes="mb-3" type="h4" />
        <div class="row">
            <div class="col-md col-12 order-md-1 order-2">
                <div class="row pb-1" v-for="item in get(invoice, 'lineItemList')">
                    <div class="col"><strong>{{ item.title }}</strong></div>
                    <div class="col-auto"><strong>{{ price(get(item, 'product.pricing.current')) }}</strong></div>
                </div>
                <!-- <div class="pb-2 row">
                    <div class="col">Unlimited Practice Tests & Mobile App</div>
                    <div class="col-auto">(Included)</div>
                </div> -->

                <div class="font-size-sm row" v-if="!invoice.grossDiscount && !applyCoupon">
                    <div class="col">
                        (<a @click.prevent="applyCoupon = !applyCoupon" href="#">Apply Coupon</a>)
                    </div>
                </div>

                <div class="row" v-if="!invoice.grossDiscount && applyCoupon">
                    <div class="col-12" v-if="couponError">
                        <div class="border border-danger font-size-sm mb-2 p-2 text-danger" v-html="couponError">
                        </div>
                    </div>
                    <div class="col">
                        <input class="form-control" placeholder="Coupon Code" v-model="couponCode">
                    </div>
                    <div class="col-auto">
                        <DiyButton button-extension-classes="btn-convert text-white" @click.prevent="apply()" :disabled="isApplying" title="Apply" />
                    </div>
                </div>

                <div class="font-size-sm row text-secondary" v-if="couponList.length > 0">
                    <div class="col">Subtotal</div>
                    <div class="col-auto">{{ price(subtotal) }}</div>
                </div>
                <div class="font-size-sm row" v-if="invoice.grossDiscount">
                    <div class="col text-secondary">Special Discount</div>
                    <div class="col-auto text-notice">-{{ price(get(invoice, 'grossDiscount')) }}</div>
                </div>
                <hr class="my-2" />
                <div class="row">
                    <div class="col">Total</div>
                    <div class="col-auto"><strong>{{ price(get(invoice, 'display.total')) }}</strong></div>
                </div>
            </div>
            <div class="col-md-auto col-12 d-flex justify-content-center order-md-2 order-1 pb-3">
                <DiyImage height="120" :remote="true" :src="computedSeal" width="120" />
            </div>
        </div>
    </div>
</template>
