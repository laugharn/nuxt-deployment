import deepGet from "../assets/js/utils/deepGet";
import push from "../assets/js/services/dataLayer/push";

export const actions = {
    push: async (context, obj) => {
        let data = obj.data || {};
        let layer =
            context.state.data == null
                ? {
                      aceId:
                          deepGet(context.rootState.user, "account._id") ||
                          null,
                      appType:
                          deepGet(
                              context.rootState.user,
                              "account.progressList.0.appType"
                          ) || null,
                      company:
                          deepGet(context.rootState.user, "intake.company") ||
                          null,
                      coupon: context.rootGetters["cart/couponIdList"],
                      courseState:
                          deepGet(
                              context.rootState.user,
                              "account.progressList.0.courseState"
                          ) || null,
                      courseType:
                          deepGet(
                              context.rootState.user,
                              "account.progressList.0.courseType"
                          ) || null,
                      email:
                          deepGet(
                              context.rootState.user,
                              "account.username",
                              "intake.email"
                          ) || null,
                      firstName:
                          deepGet(
                              context.rootState.user,
                              "account.firstName",
                              "intake.firstName"
                          ) || null,
                      isPurchased: context.rootGetters["checkout/isPurchased"],
                      lastName:
                          deepGet(
                              context.rootState.user,
                              "account.lastName",
                              "intake.lastName"
                          ) || null,
                      leadDestinationId:
                          deepGet(context.rootState.user, "intake.id") || null,
                      leadDestinationName:
                          deepGet(context.rootState.user, "intake.name") ||
                          null,
                      paymentProcessor: context.rootState.checkout.provider,
                      platform: process.env.PLATFORM,
                      productId: context.rootGetters["cart/productIdList"],
                      purchasePrice:
                          deepGet(
                              context.rootState,
                              "checkout.receipt.total",
                              "cart.invoice.total"
                          ) || null,
                      userCreatedDate:
                          deepGet(
                              context.rootState.user,
                              "account.createdAt"
                          ) || null,
                      userType: "student"
                  }
                : context.state.data;

        let pushData = { ...layer, ...data };

        pushData.event = obj.event;

        push(pushData);
    }
};

export const getters = {};

export const mutations = {
    mutateData: (state, data) => {
        state.data = data;
    }
};

export const state = () => ({
    data: null
});
