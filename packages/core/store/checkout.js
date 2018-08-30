// Libraries
import get from "lodash/get";

export const actions = {
    // Initial the Paypal instance
    initPaypal: async (context, form) => {
        context.commit("mutateIsPurchasing", true);
        context.commit("mutatePaypalForm", form);

        let paypal = window.paypal;

        paypal.checkout.setup(process.env.PAYPAL_APP_ID, {
            environment: process.env.PAYPAL_ENV
        });

        const purchaseTokenApi = await import("../assets/js/services/aceable/purchaseToken").then(
            response => response.default
        );

        let purchaseToken = await purchaseTokenApi({
            couponIdList: context.rootGetters["cart/couponIdList"],
            productIdList: context.rootGetters["cart/productIdList"],
            provider: context.state.provider,
            redirectUrl:
                window.location.href +
                (location.search.includes("?") ? "" : "?") +
                "&paypalCallback=1"
        }).catch(error => {
            context.commit(
                "mutateError",
                error.response.data.errorList[0].message
            );

            throw error.response.data.errorList[0].message;
        });

        paypal.checkout.initXO();
        paypal.checkout.startFlow(purchaseToken);
    },

    // Make the purchase
    purchase: async (context, purchaseObject = null) => {
        purchaseObject = purchaseObject
            ? purchaseObject
            : {
                  chargeAmount: get(context.rootState.cart, "invoice.total"),
                  couponIdList: context.rootGetters["cart/couponIdList"],
                  payerId: context.state.payerId,
                  productIdList: context.rootGetters["cart/productIdList"],
                  provider:
                      context.state.provider == "APPLE"
                          ? "STRIPE"
                          : context.state.provider,
                  token: context.state.token,
                  userId: get(context.rootState.user, "account._id")
              };

        const purchaseApi = await import("../assets/js/services/aceable/purchase").then(
            response => response.default
        );

        await purchaseApi(
            purchaseObject,
            get(context.rootState.user, "account.sessionToken")
        )
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );

                throw error.response.data.errorList[0].message;
            })
            .then(async receipt => {
                context.commit("mutateError", null);
                context.commit("mutateReceipt", receipt);

                await context.dispatch(
                    "layer/push",
                    {
                        event: "purchase",
                        orderId: receipt.transactionId,
                        purchasePrice: receipt.total
                    },
                    {
                        root: true
                    }
                );

                await context.dispatch("cart/resetInvoice", null, {
                    root: true
                });

                context.commit("mutateProvider", "STRIPE");
            });
    },

    purchaseAnonymous: async (context, form) => {
        context.commit("mutateError", null);

        let purchaseObject = {
            accountType: form.account_type || form.accountType || "student",
            chargeAmount: get(context.rootState.cart, "invoice.total"),
            couponIdList: context.rootGetters["cart/couponIdList"],
            email: get(
                context.rootState.user.account,
                "username",
                form.username
            ),
            firstName: get(
                context.rootState.user.account,
                "firstName",
                form.first_name || form.firstName
            ),
            payerId: context.state.payerId,
            productIdList: context.rootGetters["cart/productIdList"],
            provider:
                context.state.provider == "APPLE"
                    ? "STRIPE"
                    : context.state.provider,
            teacherEmail: form.teacher_email || form.teacherEmail,
            teacherFirstName:
                form.teacher_first_name || form.teacherFirstName || "Parent",
            token: context.state.token
        };

        const purchaseAnonymousApi = await import("../assets/js/services/aceable/purchaseAnonymous").then(
            response => response.default
        );

        await purchaseAnonymousApi(purchaseObject)
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );

                throw error.response.data.errorList[0].message;
            })
            .then(async receipt => {
                context.commit("user/mutateAccount", receipt.user, {
                    root: true
                });

                if (receipt.teacher) {
                    context.commit("user/mutateTeacher", receipt.teacher, {
                        root: true
                    });
                }

                if (receipt.user.resetCode) {
                    await context.dispatch(
                        "layer/push",
                        {
                            event: "signUp"
                        },
                        {
                            root: true
                        }
                    );
                }

                if (receipt.purchase) {
                    context.commit("mutateError", null);
                    context.commit("mutateReceipt", receipt);

                    await context.dispatch(
                        "layer/push",
                        {
                            event: "purchase",
                            orderId: receipt.transactionId,
                            purchasePrice: receipt.total
                        },
                        {
                            root: true
                        }
                    );

                    context.commit("mutateProvider", "STRIPE");

                    await context.dispatch("cart/resetInvoice", null, {
                        root: true
                    });
                } else {
                    context.commit(
                        "mutateError",
                        `You've already purchased this course.`
                    );
                }
            });
    },

    // Purchase with Apple Pay (NO)
    purchaseWithApplePay: async context => {
        //
    },

    // Purchase with Paypal
    purchaseWithPaypal: async (context, queryString) => {
        context.commit("mutateIsPurchasing");
        context.commit("mutatePayerId", queryString.PayerID);
        context.commit("mutateToken", queryString.token);

        await context
            .dispatch("purchaseAnonymous", context.state.paypalForm)
            .then(() => {
                context.commit("mutatePaypalForm", null);
            })
            .finally(() => {
                context.commit("mutateIsPurchasing");
            });
    },

    // Purchase with Stripe
    purchaseWithStripe: async (context, form) => {
        context.commit("mutateIsPurchasing");

        let stripe = window.Stripe;
        stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY);

        let token = await new Promise((resolve, reject) => {
            stripe.card.createToken(form, (status, response) => {
                if (status == 200) {
                    resolve(response);
                } else {
                    context.commit("mutateIsPurchasing");
                    context.commit("mutateError", response.error.message);

                    reject(response);
                }
            });
        });

        context.commit("mutateToken", token.id);

        await context.dispatch("purchaseAnonymous", form).finally(() => {
            context.commit("mutateIsPurchasing");
        });
    },

    // Set the payemnt provider
    setProvider: async (context, provider) => {
        context.commit("mutateProvider", provider);
    }
};

export const getters = {
    // Has the user actively made a purchase
    isPurchased: state => (state.receipt ? true : false)
};

export const mutations = {
    mutateError: (state, error = null) => {
        state.error = error;
    },

    mutateIsPurchasing: (state, value = null) => {
        state.isPurchasing = value ? value : !state.isPurchasing;
    },

    mutatePayerId: (state, id = null) => {
        state.payerId = id;
    },

    mutatePaypalForm: (state, value) => {
        state.paypalForm = value;
    },

    mutateProvider: (state, provider = null) => {
        state.provider = provider;
    },

    mutateReceipt: (state, receipt = null) => {
        state.receipt = receipt;
    },

    mutateToken: (state, token = null) => {
        state.token = token;
    }
};

export const state = () => ({
    error: null,
    isPurchasing: false,
    payerId: null,
    paypalForm: null,
    provider: "STRIPE",
    receipt: null,
    token: null
});
