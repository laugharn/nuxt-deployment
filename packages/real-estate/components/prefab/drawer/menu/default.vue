<script>
// Components
import DiyDrawer from "@core/components/diy/drawer.vue";
import DiyLink from "@core/components/diy/link.vue";

// Content
import items from "~/assets/js/content/nav";

// Libraries
import { mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyDrawer,
        DiyLink
    },

    computed: {
        computedConfig() {
            return {
                drawer: {
                    dismissalCallback: () => {
                        this.$store.commit("page/toggleMenu");
                    },
                    show: this.show,
                    title: "Menu"
                }
            };
        },

        items() {
            return items;
        },

        ...mapState({
            show: state => state.page.showMenu
        })
    },

    mixins: [prefab]
};
</script>

<template>
    <DiyDrawer v-bind="computedConfig.drawer">
        <DiyLink :key="index" link-extension-classes="border-bottom border-light p-2" v-bind="item" v-for="(item, index) in items"></DiyLink>
    </DiyDrawer>
</template>
