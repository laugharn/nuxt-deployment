<script>
// Components
// Diy
import DiyCard from "@core/components/diy/card.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyList from "@core/components/diy/list.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiyModal from "@core/components/diy/modal.vue";
import DiySpace from "@core/components/diy/space.vue";

// Custom
import Purchase from "~/components/custom/checkout/purchase.vue";
import PurchasedCard from "~/components/custom/checkout/purchased-card.vue";
import Review from "~/components/custom/checkout/product-review.vue";
import SignUpCard from "~/components/custom/checkout/sign-up-card.vue";
import Trust from "~/components/custom/checkout/trust.vue";

// Libraries
import get from "lodash/get";
import loadjs from "loadjs";
import { mapGetters, mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

/**
 * The preab binding component for the various custom checkout components
 */
export default {
    components: {
        DiyCard,
        DiyHeading,
        DiyList,
        DiyMarkdown,
        DiyModal,
        DiySpace,

        Purchase,
        PurchasedCard,
        Review,
        SignUpCard,
        Trust
    },

    computed: {
        baseConfig() {
            return {
                // The card for an empty cart and no product query params
                emptyCard: {
                    body: {
                        content: `You currently have no products in your cart.`
                    },
                    cardExtensionClasses: "big-radius p-3",
                    id: this.id + "-empty-card",
                    show: !this.isPurchased && this.productIdList.length == 0,
                    slot: "main"
                },

                // The trust, review, and purchase card
                formCard: {
                    cardExtensionClasses: "big-radius p-4",
                    id: this.id + "-form-card",
                    show:
                        this.hasDoneSignUpForm &&
                        !this.isPurchased &&
                        this.productIdList.length > 0,
                    slot: "main"
                },

                // The sub-nav below the heading
                list: {
                    inline: true,
                    items: [
                        {
                            content: "Create account »",
                            icon: {
                                icon: "check"
                            },
                            itemExtensionClasses:
                                this.hasDoneSignUpForm || !this.isPurchased
                                    ? "text-white"
                                    : null,
                            showBefore: this.hasDoneSignUpForm,
                            showIcon: this.hasDoneSignUpForm
                        },
                        // {
                        //     content: "»",
                        //     itemExtensionClasses:
                        //         this.hasDoneSignUpForm || !this.isPurchased
                        //             ? "text-white"
                        //             : null
                        // },
                        {
                            content: "Purchase »",
                            icon: {
                                icon: "check"
                            },
                            itemExtensionClasses: this.hasDoneSignUpForm
                                ? "text-white"
                                : null,
                            showBefore: this.isPurchased,
                            showIcon: this.isPurchased
                        },
                        // {
                        //     content: "»",
                        //     itemExtensionClasses: this.hasDoneSignUpForm
                        //         ? "text-white"
                        //         : null
                        // },
                        {
                            content: "Begin",
                            icon: {
                                icon: "check"
                            },
                            itemExtensionClasses: this.isPurchased
                                ? "text-white"
                                : null,
                            showBefore:
                                this.isPurchased && this.resetCode == "",
                            showIcon: this.isPurchased && this.resetCode == ""
                        }
                    ],
                    //TODO Add Opacity class instead of text-secondary
                    listExtensionClasses: "text-center text-secondary my-3",
                    slot: "body-header"
                },

                // The money-back guarantee modal
                modal: {
                    confirmationButtonTitle: "Sounds Good",
                    confirmationCallback: () => {
                        this.showModal = false;
                    },
                    content:
                        "If you're not satisfied with your Aceable experience, we'll give you a full refund. Just let us know within 30 days of purchasing the course and before you complete the course.",
                    dismissalCallback: () => {
                        this.showModal = false;
                    },
                    show: this.showModal,
                    showFooter: false,
                    slot: "portal",
                    title: "100% Money Back"
                },

                // The purchase component
                purchasedCard: {
                    id: this.id + "-purchased-card",
                    show: this.isPurchased,
                    slot: "main"
                },

                // The sign-up card
                signUpCard: {
                    id: this.id + "-sign-up-card",
                    slot: "main",
                    show:
                        !this.hasDoneSignUpForm &&
                        !this.user &&
                        this.productIdList.length > 0
                },

                // The checkout space
                space: {
                    asideExtensionClasses: "d-none",
                    bodyHeaderClasses: "col-md-9",
                    bodyHeaderExtensionClasses: "mx-auto",
                    id: this.id,
                    mainClasses: "col-md-9",
                    mainExtensionClasses: "mx-auto p-3",
                    show: !this.loading,
                    showAside: false,
                    wrapperExtensionClasses: "bg-brand-to-success py-4"
                    //TODO Add class to make page min-height 100vh somehow
                },

                // The heading
                title: {
                    content: this.isPurchased
                        ? "Purchase complete"
                        : "Place your order",
                    headingClasses:
                        "font-weight-normal mb-0 text-center text-white",
                    id: this.id + "-title",
                    slot: "body-header",
                    type: "h1"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        },

        // Return the appropriate reset code based on the type of account. TODO: make a user getter
        resetCode() {
            if (get(this.$store.state.checkout.receipt, "isTeacher")) {
                return get(this.$store.state.user.teacher, "resetCode", "");
            }

            return get(this.$store.state.user.account, "resetCode", "");
        },

        // The sign-up object
        signUpObject() {
            return this.form.username == null
                ? null
                : {
                      accountType: this.form.accountType,
                      firstName: this.form.firstName,
                      teacherEmail: this.form.teacherEmail,
                      username: this.form.username
                  };
        },

        // Getters for the productIdList and isPurchased values
        ...mapGetters({
            isPurchased: "checkout/isPurchased",
            productIdList: "cart/productIdList"
        }),

        // The user account
        ...mapState({
            user: state => state.user.account
        })
    },

    data() {
        return {
            // Our signup form object
            form: {
                firstName: null,
                teacherEmail: null,
                username: null
            },
            hasDoneSignUpForm: false,
            loading: true,
            showModal: false
        };
    },

    methods: {
        // If we have the PayPal callback in our URL, do a PayPal purchase
        async initializePaypalFromQueryString() {
            if (
                this.$route.query.PayerID &&
                this.$route.query.token &&
                this.$route.query.paypalCallback == 1
            ) {
                await this.$store.dispatch(
                    "checkout/purchaseWithPaypal",
                    this.$route.query
                );
            }
        },

        // Parse product, coupon, etc. data from the query string
        async parseQueryString() {
            if (!this.$route.query.paypalCallback) {
                await this.$store.dispatch("user/signOut");

                if (this.$route.query.productId) {
                    if (this.$route.query.productId) {
                        await this.$store.dispatch("cart/setInvoice", {
                            productIdList: this.$route.query.productId.split(
                                ","
                            )
                        });
                    }

                    if (this.$route.query.couponCode) {
                        await this.$store.dispatch(
                            "cart/addCoupon",
                            this.$route.query.couponCode
                        );
                    }
                }
            }
        }
    },

    mixins: [prefab],

    async mounted() {
        // If the paypal form isn't null, we've done sign-up already
        if (
            this.$store.state.checkout.paypalForm &&
            this.$route.query.paypalCallback
        ) {
            this.hasDoneSignUpForm = true;
        } else {
            this.$store.commit("checkout/mutatePaypalForm", null);
        }

        // If we haven't loaded Stripe and PayPal, load them
        if (!loadjs.isDefined("checkout")) {
            loadjs(
                [
                    "https://js.stripe.com/v2/",
                    "https://www.paypalobjects.com/api/checkout.js"
                ],
                "checkout"
            );
        }

        // Parse the query string
        await this.parseQueryString();

        // We've loaded, expose the components
        this.loading = false;

        // Check if we should make a PayPal purchase
        await this.initializePaypalFromQueryString();

        // Event bus for setting the sign-up form values. Mayyyybe go stateful?
        this.$nuxt.$on("hasDoneSignUpForm", form => {
            this.form = form;
            this.hasDoneSignUpForm = true;
        });
    },

    props: {
        configKey: {
            default: "spaces.checkout",
            type: String
        },

        id: {
            default: "checkout",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyList v-bind="computedConfig.list" />

        <DiyCard v-bind="computedConfig.emptyCard">
            <DiyMarkdown v-bind="computedConfig.emptyCard.body" />
        </DiyCard>

        <SignUpCard :config="computedConfig.signUpCard" v-bind="computedConfig.signUpCard" />

        <!-- TODO: Prefabricate -->
        <DiyCard v-bind="computedConfig.formCard">
            <Trust />
            <Review />
            <Purchase
                :sign-up-object="signUpObject"
            />
            <div class="py-2 text-center">
                <a class="text-progress" @click.prevent="showModal = !showModal" href="#">100% Money Back Guarantee</a>
            </div>
        </DiyCard>

        <PurchasedCard :config="computedConfig.purchasedCard" v-bind="computedConfig.purchasedCard" />

        <DiyModal v-bind="computedConfig.modal" />
    </DiySpace>
</template>
