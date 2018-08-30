<script>
// Components
//DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyLoader from "@core/components/diy/loader.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

//Libraries
import clone from "lodash/clone";
import get from "lodash/get";
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton,
        DiyLoader,
        DiyMarkdown
    },

    computed: {
        // The omnibus purchase error
        computedError() {
            return (
                this.error ||
                this.$store.state.cart.error ||
                this.$store.state.checkout.error ||
                this.$store.state.user.error ||
                null
            );
        },

        // An array of months for the exp_month dropdown
        computedMonths() {
            return [...Array(12).keys()].map(month =>
                ("0" + (month + 1)).slice(-2)
            );
        },

        // The terms & conditions URL
        computedTermsUrl() {
            return get(
                this.product,
                "product.termsUrl",
                "https://aceable.com/tandc"
            );
        },

        // An array of months for the exp_year dropdown
        computedYears() {
            return [...Array(10).keys()].map(year => year + 2018);
        },

        ...mapGetters({
            product: "cart/product"
        }),

        ...mapState({
            // TODO: Rename to purchasing, drop the is
            isPurchasing: state => state.checkout.isPurchasing,
            provider: state => state.checkout.provider,
            receipt: state => state.checkout.receipt,
            user: state => state.user.account
        })
    },

    data() {
        return {
            // The purchase form
            form: {
                accountType: "student",
                cardholderName: null,
                firstName: null,
                cvc: null,
                exp_month: null,
                exp_year: null,
                number: null,
                teacherEmail: null,
                password: null,
                username: null
            },
            accountMethod: "sign-up",
            error: null,
            showParentEmail: false,
            termsAndConditions: true
        };
    },

    methods: {
        // Purchase the product
        async purchase() {
            // Don't let somebody retrigger a purchase if a purchase is in progress
            if (this.isPurchasing) {
                return false;
            }

            let form = clone(this.form, true);

            // Empty out the omnibus error
            this.error = null;
            this.$store.commit("cart/mutateError", null);
            this.$store.commit("checkout/mutateError", null);
            this.$store.commit("user/mutateError", null);

            // If there's no user or form username, throw an error
            if (!this.user && !form.username) {
                this.error = "An email address is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is signing in and forgets a password, throw an error (inactive)
            if (
                !this.user &&
                !form.password &&
                this.accountMethod == "sign-in"
            ) {
                this.error = "A password is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If there's no user or first name, throw an error
            if (
                !this.user &&
                !form.firstName &&
                this.accountMethod == "sign-up"
            ) {
                this.error = "A first name is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is using a credit card and there's no cardholder name, throw an error
            if (!form.cardholderName && this.provider == "STRIPE") {
                this.error = "A cardholder name is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is using a credit card and there's no card number, throw an error
            if (!form.number && this.provider == "STRIPE") {
                this.error = "A card number is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is using a credit card and there's no CVC, throw an error
            if (!form.cvc && this.provider == "STRIPE") {
                this.error = "A CVC number is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is using a credit card and there's no exp_month, throw an error
            if (!form.exp_month && this.provider == "STRIPE") {
                this.error = "An expiration month is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user is using a credit card and there's no exp_year, throw an error
            if (!form.exp_year && this.provider == "STRIPE") {
                this.error = "An expiration year is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the user hasn't agreed to the terms & conditions, throw an error
            if (!this.termsAndConditions) {
                this.error = "You must agree to the Terms and Conditions";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            // If the account method is set to sign in, do sign in (inactive)
            if (this.accountMethod == "sign-in") {
                await this.$store.dispatch("user/signIn", {
                    password: form.password,
                    username: form.username
                });
            }

            // If the user is purchasing with a credit card
            if (this.provider == "STRIPE") {
                form.teacherFirstName = form.cardholderName.split(" ")[0];

                // Do anonymous purchase with Stripe
                await this.$store.dispatch("checkout/purchaseWithStripe", form);

                // If the user is purchasing with PayPal
            } else if (this.provider == "PAYPAL") {
                // Initialize the PayPal purchase flow
                await this.$store.dispatch("checkout/initPaypal", form);
            }
        },

        // Set the provider between Stripe and PayPal
        setProvider(provider) {
            this.$store.commit("checkout/mutateProvider", provider);
        },

        // Toggle between sign-in or sign-up (inactive)
        toggleAccountMethod() {
            this.accountMethod =
                this.accountMethod == "sign-up" ? "sign-in" : "sign-up";
        }
    },

    mixins: [prefab],

    // Upsert the sign-up object
    async mounted() {
        this.form = {
            ...this.form,
            ...this.signUpObject,
            ...this.$store.state.checkout.paypalForm
        };
    },

    props: {
        signUpObject: {
            default: null
        }
    }
};
</script>

<template>
    <div class="pt-3">
        <DiyMarkdown content="<span class='text-progress'>Step 2.</span> Enter payment details" markdown-extension-classes="h4" :marked="true" />

        <div class="alert alert-danger mb-3" id="error" v-show="computedError" v-html="computedError"></div>

        <div class="row" v-if="!provider">
            <div class="col">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="setProvider('STRIPE')" :disabled="isPurchasing" icon="cc-stripe" :show-icon-before="true" title="Credit Card" />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="setProvider('PAYPAL')" :disabled="isPurchasing" icon="cc-paypal" :show-icon-before="true" title="PayPal" />
                </div>
            </div>
        </div>

        <div class="alert alert-light mb-3" v-if="provider">You are currently checking out with <strong>{{ provider == 'STRIPE' ? 'a Credit Card' : 'PayPal' }}</strong>. If you would like to use a different payment method, <a @click.prevent="$store.dispatch('checkout/setProvider', null)" href="#">click here</a>.</div>

        <div class="form-row" v-if="provider == 'PAYPAL'">
            <div class="col-12">
                <DiyLoader wrapper-extension-classes="d-flex justify-content-center py-3" v-if="isPurchasing" />
            </div>
            <div class="col-12">
                <div class="border border-brand mb-3 p-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="termsAndConditions">
                        <label class="form-check-label">
                        I agree to the <a href="#" target="_blank">Terms and Conditions</a>
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="purchase()" :disabled="isPurchasing" title="Complete Purchase" />
                </div>
            </div>
        </div>

        <div class="form-row" v-if="provider == 'STRIPE'">
            <div class="col-md-12">
                <div class="form-group">
                    <input class="form-control form-control-lg" placeholder="Cardholder Full Name" type="text" v-model="form.cardholderName" />
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <input class="form-control form-control-lg" maxlength="20" pattern="\d*" placeholder="Credit Card Number" type="text" v-model="form.number" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <select class="form-control form-control-lg" v-model="form.exp_month">
                        <option :value="null">Exp Month</option>
                        <option v-for="month in computedMonths">{{ month }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <select class="form-control form-control-lg" v-model="form.exp_year">
                        <option :value="null">Exp Year</option>
                        <option v-for="year in computedYears">{{ year }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <input class="form-control form-control-lg" maxlength="4" pattern="\d*" placeholder="CVC" type="text" v-model="form.cvc" />
                </div>
            </div>
            <div class="col-12">
                <div class="alert alert-light mb-3 p-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="termsAndConditions">
                        <label class="form-check-label">
                        I agree to the <a class="text-progress" :href="computedTermsUrl" target="_blank">Terms and Conditions</a>
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="purchase()" :disabled="isPurchasing" icon="chevron-right" :show-icon-after="true" title="Complete Purchase" />
                </div>
            </div>
        </div>
    </div>
</template>
