<script>
// Components
// DIY
import DiyModal from "@core/components/diy/modal.vue";

// Libraries
import get from "lodash/get";
import { mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyModal
    },

    computed: {
        defaultConfig() {
            return {
                modal: {
                    confirmationCallback: async () => {
                        await this.$store.dispatch(
                            "cart/resolveConflict",
                            true
                        );

                        this.$store.commit("page/toggleCart");
                    },
                    content: `**${get(
                        this.$store.state.cart.conflict,
                        "new.title"
                    )}** contains courses that are already in your cart from **${get(
                        this.$store.state.cart.conflict,
                        "old.title"
                    )}**. To replace, click **Confirm**, otherwise click **Cancel**.`,
                    dismissalCallback: async () => {
                        await this.$store.dispatch(
                            "cart/resolveConflict",
                            false
                        );

                        this.$store.commit("page/toggleCart");
                    }
                }
            };
        },

        ...mapState({
            conflict: state => state.cart.conflict
        })
    },

    data() {
        return {
            loading: true
        };
    },

    mixins: [prefab],

    mounted() {
        this.loading = false;
    },

    props: {
        configKey: {
            default: "modals.conflict"
        }
    }
};
</script>

<template>
    <DiyModal :show="conflict && !loading" v-bind="computedConfig.modal">
    </DiyModal>
</template>
