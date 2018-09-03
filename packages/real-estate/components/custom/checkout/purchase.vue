<script>
//DIY Components
import DiyButton from "@core/components/diy/button.vue";
import DiyHeading from "@core/components/diy/heading.vue";

//Libraries
import get from "lodash/get";
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        // DIY
        DiyButton,
        DiyHeading
    },

    computed: {
        computedError() {
            return (
                this.error ||
                this.$store.state.cart.error ||
                this.$store.state.checkout.error ||
                this.$store.state.user.error ||
                null
            );
        },

        computedTermsUrl() {
            return get(
                this.product,
                "product.termsUrl",
                "https://aceable.com/tandc"
            );
        },

        ...mapGetters({
            product: "cart/product"
        }),

        ...mapState({
            isPurchasing: state => state.checkout.isPurchasing,
            provider: state => state.checkout.provider,
            receipt: state => state.checkout.receipt,
            user: state => state.user.account
        })
    },

    data() {
        return {
            form: {
                firstName: null,
                cvc: null,
                exp_month: null,
                exp_year: null,
                number: null,
                password: null,
                username: null
            },
            accountMethod: "sign-up",
            error: null,
            termsAndConditions: true
        };
    },

    methods: {
        async purchase() {
            if (this.isPurchasing) {
                return false;
            }

            this.error = null;

            const emailRegExp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (!this.user && !this.form.username) {
                this.error = "An email address is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.user && !emailRegExp.test(this.form.username)) {
                this.error = "Please enter a valid email address";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (
                !this.user &&
                !this.form.password &&
                this.accountMethod == "sign-in"
            ) {
                this.error = "A password is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (
                !this.user &&
                !this.form.firstName &&
                this.accountMethod == "sign-up"
            ) {
                this.error = "A first name is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.form.number && this.provider == "STRIPE") {
                this.error = "A card number is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.form.cvc && this.provider == "STRIPE") {
                this.error = "A CVC number is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.form.exp_month && this.provider == "STRIPE") {
                this.error = "An expiration month is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.form.exp_year && this.provider == "STRIPE") {
                this.error = "An expiration year is required";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (!this.termsAndConditions) {
                this.error = "You must agree to the Terms and Conditions";
                await this.$store.dispatch("page/scrollTo", "#error");

                return false;
            }

            if (this.accountMethod == "sign-in") {
                await this.$store.dispatch("user/signIn", {
                    password: this.form.password,
                    username: this.form.username
                });
            }

            if (this.provider == "STRIPE") {
                await this.$store.dispatch(
                    "checkout/purchaseWithStripe",
                    this.form
                );
            } else if (this.provider == "PAYPAL") {
                await this.$store.dispatch("checkout/initPaypal");
            }
        },

        setProvider(provider) {
            this.$store.commit("checkout/mutateProvider", provider);
        },

        toggleAccountMethod() {
            this.accountMethod =
                this.accountMethod == "sign-up" ? "sign-in" : "sign-up";
        }
    },

    mixins: [prefab]
};
</script>

<template>
    <div class="p-3">
        <DiyHeading content="Enter details" heading-extension-classes="mb-3" type="h4" />

        <div class="alert alert-danger mb-3" id="error" v-show="computedError" v-html="computedError"></div>

        <div class="form-row" v-if="!provider">
            <div class="col">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-progress" @click.prevent="setProvider('STRIPE')" :disabled="isPurchasing" title="Credit Card" />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-link text-progress" @click.prevent="setProvider('PAYPAL')" :disabled="isPurchasing" title="PayPal" />
                </div>
            </div>
        </div>

        <!-- <div class="alert alert-light font-size-sm mb-3" v-if="provider">You are currently checking out with <strong>{{ provider == 'STRIPE' ? 'a Credit Card' : 'PayPal' }}</strong>. If you would like to use a different payment method, <a @click.prevent="$store.dispatch('checkout/setProvider', null)" href="#">click here</a>.</div> -->

        <div class="alert alert-light font-size-sm mb-3" v-if="provider && user">You are currently logged in as <strong>{{ user.username}}</strong>. To sign out and use a different account, <a @click.prevent="$store.dispatch('user/signOut')" href="#">click here</a>.</div>

        <div class="form-row" v-if="provider && !user">
            <div class="col">
                <p><strong>Your information</strong> (<a @click.prevent="toggleAccountMethod()" href="#">{{ accountMethod == 'sign-up' ? 'Returning User?' : 'New User?' }}</a>)</p>
            </div>
        </div>

        <div class="form-row" v-if="provider && accountMethod == 'sign-in' && !user">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Email Address</label>
                    <input class="form-control" placeholder="Email" type="email" v-model="form.username" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Password</label>
                    <input class="form-control" placeholder="Password" type="password" v-model="form.password" />
                </div>
            </div>
            <div class="col">
                <p class="font-size-sm"><a href="https://app.aceable.com/user/password" target="_blank">Forgot your password?</a></p>
            </div>
        </div>

        <div class="form-row" v-if="provider && accountMethod == 'sign-up' && !user">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Email Address</label>
                    <input class="form-control" placeholder="Email" type="email" v-model="form.username" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>First Name</label>
                    <input class="form-control" placeholder="First Name" type="text" v-model="form.firstName" />
                </div>
            </div>
        </div>

        <div class="form-row" v-if="provider == 'PAYPAL'">
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
            <div class="col-md-6">
                <div class="form-group">
                    <a class="btn-block btn-progress" @click.prevent="purchase()" href="#">Complete Purchase</a>
                </div>
            </div>
        </div>

        <div class="form-row" v-if="provider == 'STRIPE'">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Card Number</label>
                    <input class="form-control" maxlength="20" pattern="\d*" placeholder="Card Number" type="text" v-model="form.number" />
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>CVC</label>
                    <input class="form-control" maxlength="4" pattern="\d*" placeholder="CVC" type="text" v-model="form.cvc" />
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Expiration Month</label>
                    <select class="form-control" v-model="form.exp_month">
                        <option></option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Expiration Year</label>
                    <select class="form-control" v-model="form.exp_year">
                        <option></option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="font-size-sm mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="termsAndConditions">
                        <label class="form-check-label">
                        I agree to the <a :href="computedTermsUrl" target="_blank">Terms and Conditions</a>
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <DiyButton :block="true" button-extension-classes="btn-progress" @click.prevent="purchase()" :disabled="isPurchasing" title="Complete Purchase" />
                </div>
            </div>
        </div>
    </div>
</template>
