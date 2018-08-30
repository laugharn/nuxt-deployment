// Lodash get
import get from "lodash/get";

// Utils
// Get top level and nested product IDs from a product endpoint product
const getDeepIds = product => [product._id, ...product.productList];

// Get top level and nested product IDs from a purchase receipt endpoint line item
const getDeepLineItemIds = lineItem => [
    lineItem.product._id,
    ...lineItem.productList.map(itemProduct => itemProduct._id)
];

// Get top level and nested product IDs from a purchase receipt endpoint invoice
const getDeepInvoiceIds = invoice =>
    [].concat.apply(
        [],
        invoice.lineItemList.map(item => getDeepLineItemIds(item))
    );

// Get the intersection of two arrays
const intersect = (arr1, arr2) => arr2.filter(id => arr1.includes(id));

export const actions = {
    // Add a coupon to the invoice
    addCoupon: async (context, couponCode) => {
        const couponApi = await import("../assets/js/services/aceable/coupon").then(
            response => response.default
        );

        await couponApi(couponCode)
            .then(async response => {
                await context.dispatch("setInvoice", {
                    couponIdList: [response._id],
                    productIdList: context.getters.productIdList
                });
            })
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );
            });
    },

    // Add an array of products to the invoice
    addProducts: async (context, products) => {
        let confirmation,
            conflict,
            couponList,
            intersection,
            invoiceProductIds,
            productIdList,
            productIds;

        // If the array is empty, alert
        if (products.length == 0) {
            alert("You Need a product to add");

            return false;
        }

        // Iterate through the product array
        for (const product of products) {
            // Get the IDs for the product
            productIds = getDeepIds(product);

            // Get the IDs in the invoice
            invoiceProductIds = context.state.invoice
                ? getDeepInvoiceIds(context.state.invoice)
                : [];

            // See if the product is already in the invoice
            intersection = intersect(invoiceProductIds, productIds);

            // If the product is already in the invoice, create a conflict: the product in the invoice currently (old) and the product to add (new)
            if (intersection.length > 0) {
                // Commit the conflict to state
                context.commit("mutateConflict", {
                    new: { _id: product._id, title: product.content.title },
                    old: context.state.invoice.lineItemList
                        .filter(
                            lineItem =>
                                intersect(
                                    getDeepLineItemIds(lineItem),
                                    productIds
                                ).length > 0
                        )
                        .map(lineItem => {
                            return {
                                _id: lineItem.product._id,
                                title: lineItem.title
                            };
                        })
                        .shift()
                });
            } else {
                // Create a list of product IDs to add to the invoice
                productIdList = context.state.invoice
                    ? [
                          ...context.state.invoice.lineItemList.map(
                              lineItem => lineItem.product._id
                          ),
                          product._id
                      ]
                    : [product._id];

                // Set the invoice
                await context
                    .dispatch("setInvoice", {
                        couponIdList: context.getters.couponIdList,
                        productIdList
                    })
                    .catch(error => {
                        context.commit(
                            "mutateError",
                            error.response.data.errorList[0].message
                        );
                    })
                    .then(async () => {
                        await context.dispatch(
                            "layer/push",
                            {
                                event: "addToCart"
                            },
                            {
                                root: true
                            }
                        );
                    });
            }
        }

        return true;
    },

    addProductsWithoutConflict: async (context, products) => {
        let productIdList;

        // If the array is empty, alert
        if (products.length == 0) {
            alert("You Need a product to add");

            return false;
        }

        // Create a list of product IDs to add to the invoice
        productIdList = products.map(product => product._id);

        // Set the invoice
        await context
            .dispatch("setInvoice", {
                couponIdList: context.getters.couponIdList,
                productIdList
            })
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );
            });
    },

    // Remove a coupon from the invoice
    removeCoupon: async (context, coupon) => {
        // Create a list of coupon IDs without the one to remove
        let couponIdList = context.getters.couponIdList.filter(
            listItem => listItem !== coupon._id
        );

        // Set the invoice
        await context
            .dispatch("setInvoice", {
                couponIdList,
                productIdList: context.getters.productIdList
            })
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );
            });
    },

    // Remove a product from the invoice
    removeProduct: async (context, item) => {
        // Create a list of product IDs without the one to remove
        let productIdList = context.getters.productIdList.filter(
            listItem => listItem !== item.product._id
        );

        // Set the invoice
        await context
            .dispatch("setInvoice", {
                couponIdList: context.getters.couponIdList,
                productIdList
            })
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );
            });
    },

    // Reset the invoice
    resetInvoice: async context => {
        // Set the invoice with empty lists
        await context
            .dispatch("setInvoice", {
                couponIdList: [],
                productIdList: []
            })
            .catch(error => {
                context.commit(
                    "mutateError",
                    error.response.data.errorList[0].message
                );
            });
    },

    // Resolve a duplicate product conflict
    resolveConflict: async (context, value) => {
        // If they confirm, replace the old product with the new product
        if (value) {
            // Create a list of product IDs with the old removed and the new added
            let productIdList = [
                ...context.getters.productIdList.filter(
                    lineItem => lineItem !== context.state.conflict.old._id
                ),
                context.state.conflict.new._id
            ];

            // Set the invoice
            await context
                .dispatch("setInvoice", {
                    couponIdList: context.getters.couponIdList,
                    productIdList
                })
                .catch(error => {
                    context.commit(
                        "mutateError",
                        error.response.data.errorList[0].message
                    );
                });
        }

        // Regardless of their choice, the conflict is over
        context.commit("mutateConflict", null);
    },

    // Set the invoice
    setInvoice: async (context, lists) => {
        // Get the ID lists
        let { couponIdList = [], productIdList } = lists;

        const invoiceApi = await import("../assets/js/services/aceable/invoice").then(
            response => response.default
        );

        // Call to the Aceable API
        await invoiceApi({
            couponIdList,
            productIdList
        })
            .then(async response => {
                // If the response is 200, set the response as the invoice
                context.commit("mutateInvoice", response);

                // Remove the error
                context.commit("mutateError", null);
            })
            .catch(async error => {
                context.commit("mutateError", error.response.data.errorList[0]);

                // If we have a coupon error of some kind
                if (
                    error.response.data.errorList[0].message.includes("Coupon")
                ) {
                    // Recursively set the invoice with an empty couponIdList
                    await context.dispatch("setInvoice", {
                        couponIdList: [],
                        productIdList: productIdList
                    });
                }
            });

        return true;
    }
};

export const getters = {
    // The number of items in the cart
    count: state => get(state.invoice, "lineItemList", []).length,

    // The _id of all coupons in the invoice
    couponIdList: (state, getters) =>
        getters.couponList.map(coupon => coupon._id),

    // All coupons in the invoice
    couponList: state =>
        get(state.invoice, "lineItemList", []).length > 0
            ? state.invoice.lineItemList[0].couponList
            : [],

    grossDiscount: state => get(state.invoice, "grossDiscount", null),

    // The first product of the invoice for DRV Checkout
    product: state => get(state.invoice, "lineItemList.0", []),

    // The _id of all products in the invoice
    productIdList: (state, getters) =>
        getters.productList.map(lineItem => lineItem.product._id),

    // All products in the invoice
    productList: state =>
        state.invoice && state.invoice !== [] ? state.invoice.lineItemList : [],

    subtotal: state =>
        state.invoice && state.invoice !== []
            ? state.invoice.display.grossTotal
            : null,

    total: state =>
        state.invoice && state.invoice !== []
            ? state.invoice.display.total
            : null
};

export const mutations = {
    // Set the conflict value
    mutateConflict: (state, value) => {
        state.conflict = value;
    },

    // Set the error value
    mutateError: (state, value) => {
        state.error = value;
    },

    // Set the invoice value
    mutateInvoice: (state, value) => {
        state.invoice = value;
    }
};

export const state = () => ({
    conflict: null,
    error: null,
    invoice: null
});
