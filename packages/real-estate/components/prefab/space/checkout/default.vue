<script>
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCard from "@core/components/diy/card.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiySpace from "@core/components/diy/space.vue";

import Purchase from "~/components/custom/checkout/purchase.vue";
import Review from "~/components/custom/checkout/product-review.vue";

// Libraries
import loadjs from "loadjs";
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import passwordResetApi from "@core/assets/js/services/aceable/passwordReset";

export default {
    components: {
        // DIY
        DiyButton,
        DiyCard,
        DiyHeading,
        DiySpace,

        // Custom
        Purchase,
        Review
    },

    computed: {
        defaultConfig() {
            return {
                space: {
                    asideExtensionClasses: "d-none",
                    bodyHeaderClasses: "col-md-8",
                    bodyHeaderExtensionClasses: "mx-auto",
                    mainClasses: "col-md-8",
                    mainExtensionClasses: "mx-auto p-3",
                    showAside: false,
                    wrapperExtensionClasses: "bg-brand-to-success py-3"
                },

                title: {
                    content: "Place your order",
                    headingClasses: "mb-0 text-white",
                    slot: "body-header",
                    type: "h2"
                }
            };
        },

        ...mapGetters({
            isPurchased: "checkout/isPurchased",
            productIdList: "cart/productIdList"
        }),

        ...mapState({
            isPurchasing: state => state.checkout.isPurchasing
        })
    },

    data() {
        return {
            hasReset: false,
            loading: true,
            password: null,
            passwordError: null
        };
    },

    methods: {
        async resetPassword() {
            let obj = {
                password: this.password,
                code: this.$store.state.user.account.resetCode,
                username: this.$store.state.user.account.username
            };

            await passwordResetApi(obj)
                .then(response => {
                    this.$store.commit("user/mutateAccount", response);

                    this.passwordError = null;
                    this.hasReset = true;
                })
                .catch(error => {
                    this.passwordError =
                        error.response.data.errorList[0].message;
                });
        }
    },

    mixins: [prefab],

    async mounted() {
        if (!loadjs.isDefined("checkout")) {
            loadjs(
                [
                    "https://js.stripe.com/v2/",
                    "https://www.paypalobjects.com/api/checkout.js"
                ],
                "checkout"
            );
        }

        let queryString = this.$route.query;

        if (!queryString.paypalCallback && queryString.productId) {
            if (queryString.productId) {
                await this.$store.dispatch("cart/setInvoice", {
                    productIdList: queryString.productId.split(",")
                });
            }

            if (queryString.couponCode) {
                await this.$store.dispatch(
                    "cart/addCoupon",
                    queryString.couponCode
                );
            }
        }

        this.loading = false;

        if (
            queryString.PayerID &&
            queryString.token &&
            queryString.paypalCallback == 1
        ) {
            await this.$store.dispatch(
                "checkout/purchaseWithPaypal",
                queryString
            );
        }
    },

    props: {
        configKey: {
            default: "spaces.checkout",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space" v-if="!loading">
        <DiyHeading v-bind="computedConfig.title" v-if="!isPurchased" />

        <DiyCard slot="main" v-if="!isPurchased && productIdList.length == 0">
            <div class="p-3">
                You currently have no products in your cart.
            </div>
        </DiyCard>

        <DiyCard :card-extension-classes="null" slot="main" v-if="!isPurchased && productIdList.length > 0">
            <div class="bg-dark d-none d-md-block font-size-sm p-3 text-white">
                <div class="row">
                    <div class="col">
                        <ul class="list-inline mb-0">
                            <li class="list-inline-item">
                                <span class="text-success">✓</span>
                                State-approved
                            </li>
                            <li class="list-inline-item">
                                <span class="text-success">✓</span>
                                Best-in-class content
                            </li>
                            <li class="list-inline-item">
                                <span class="text-success">✓</span>
                                Support 7 days a week
                            </li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <span style="color:yellow">★</span>
                        <span style="color:yellow">★</span>
                        <span style="color:yellow">★</span>
                        <span style="color:yellow">★</span>
                        <span style="color:yellow">★</span>
                        &nbsp;
                        4.9 / 5
                    </div>
                </div>
            </div>
            <Review />
            <Purchase />
        </DiyCard>

        <DiyCard slot="main" v-if="isPurchased">
            <div class="p-3">
                <DiyHeading content="Thank you for purchasing our course!" heading-extension-classes="mb-2" />

                <div class="alert alert-danger mb-3" v-html="passwordError" v-if="passwordError"></div>

                <div v-if="$store.state.user.account.resetCode !== ''">
                    <p>Before you get started, we need to set the password for your account. Please enter your new password below.</p>

                    <div class="form-row">
                        <div class="col-md col-12">
                            <input class="form-control" placeholder="Password" type="password" v-model="password">
                            <p class="font-size-sm form-text text-secondary">Your password must be at least 6 characters long</p>
                        </div>
                        <div class="col-md-auto col-12 justify-content-center">
                            <a class="btn btn-convert" @click.prevent="resetPassword()" href="#">Set Password</a>
                        </div>
                    </div>
                </div>

                <p v-if="$store.state.user.account.resetCode == ''">You're all set! So what's next? You are ready to take the course, of course! Once in, you'll be asked to complete your student profile and then you can start taking Chapter 1.</p>

                <p v-if="$store.state.user.account.resetCode == ''">If you have an Apple (iPad and iPhone) or Android device, be sure to download the following for the best experience possible!</p>

                <div class="form-row" v-if="$store.state.user.account.resetCode == ''">
                    <div class="col">
                        <a class="btn btn-block btn-progress" href="https://app.aceable.com/user/signin">
                            Web Course
                        </a>
                    </div>
                    <div class="col">
                        <a class="btn btn-block btn-outline-primary" href="https://itunes.apple.com/us/developer/aceable-inc./id597625681" target="_blank">
                            App Store
                        </a>
                    </div>
                    <div class="col">
                        <a class="btn btn-block btn-outline-primary" href="https://play.google.com/store/apps/details?id=com.aceable.aceablede_android" target="_blank">
                            Google Play
                        </a>
                    </div>
                </div>
            </div>
        </DiyCard>
    </DiySpace>
</template>
