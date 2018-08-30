<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

import Countdown from "~/components/custom/checkout/countdown.vue";

// Libraries
import { mapGetters, mapState } from "vuex";

// Utils
import price from "@core/assets/js/utils/price";

export default {
    components: {
        Countdown,
        DiyButton,
        DiyImage,
        DiyMarkdown
    },

    computed: {
        // The seal. This has AA logic but whatcha gonna do, these will merge eventually right? Right?
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
            applying: false,
            couponCode: null,
            couponError: null
        };
    },

    methods: {
        // Applying a coupon
        async apply() {
            // Coupon applying in progress
            this.applying = true;

            // Apply the couponCode
            await this.$store
                .dispatch("cart/addCoupon", this.couponCode)
                .then(() => {
                    // Success, empty out the error
                    this.couponError = null;
                })
                .catch(error => {
                    // Failure, set the error
                    this.couponError = error.response.data.errorList[0].message;
                })
                .finally(() => {
                    // Regardless, coupon applying is no longer in progress
                    this.applying = false;
                });
        },

        // Format the price
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

<template>
    <div class="pb-3" v-if="invoice && product">
        <DiyMarkdown content="Review items" markdown-extension-classes="h4" :marked="true" />
        <div class="row">
            <div class="col-md col-12 order-md-1 order-2">
                <div class="row pb-1" v-for="item in get(invoice, 'lineItemList')">
                    <div class="col"><strong>{{ item.title }}</strong></div>
                    <div class="col-auto"><strong>{{ price(get(item, 'product.pricing.current')) }}</strong></div>
                </div>
                <div class="pb-2 row">
                    <div class="col">Unlimited Practice Tests &amp; Mobile App</div>
                    <div class="col-auto">FREE</div>
                </div>

                <div class="font-size-sm row" id="apply-coupon-link" v-if="!invoice.grossDiscount && !applyCoupon">
                    <div class="col">
                        (<a @click.prevent="applyCoupon = !applyCoupon" href="#">Apply Coupon</a>)
                    </div>
                </div>

                <div class="row" id="apply-coupon" v-if="!invoice.grossDiscount && applyCoupon">
                    <div class="col-12" v-if="couponError">
                        <div class="border border-danger font-size-sm mb-2 p-2 text-danger" v-html="couponError">
                        </div>
                    </div>
                    <div class="col">
                        <input class="form-control" placeholder="Coupon Code" v-model="couponCode">
                    </div>
                    <div class="col-auto">
                        <DiyButton button-extension-classes="btn-convert text-white" @click.prevent="apply()" :disabled="applying" title="Apply" />
                    </div>
                </div>

                <div class="font-size-sm row text-secondary" v-if="couponList.length > 0">
                    <div class="col">Subtotal</div>
                    <div class="col-auto">{{ price(subtotal) }}</div>
                </div>
                <div class="font-size-lg row justify-content-center align-items-center" v-if="invoice.grossDiscount">
                    <div class="col text-secondary"><Countdown /></div>
                    <div class="col-auto text-notice font-weight-bold">-{{ price(get(invoice, 'grossDiscount')) }}</div>
                </div>
                <hr class="my-2" />
                <div class="row">
                    <div class="col">Total</div>
                    <div class="col-auto"><strong>{{ price(get(invoice, 'display.total')) }}</strong></div>
                </div>
            </div>
            <div class="col-md-auto col-12 justify-content-center order-md-2 order-1 pb-3 d-md-flex d-none">
                <DiyImage height="120" :remote="true" :src="computedSeal" width="120" />
            </div>
        </div>
    </div>
</template>
