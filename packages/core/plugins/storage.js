import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: process.env.VUEX_KEY,
    paths: [
      "cart.conflict",
      "cart.invoice",
      "checkout.paypalForm",
      "checkout.provider",
      "updated_at",
      "user.account",
      "user.intake"
    ]
  })(store);
};
