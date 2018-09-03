<script>
// Components
// DIY
import DiyStructure from "@core/components/diy/structure.vue";

// Prefab
import DrawerCart from "../drawer/cart/default.vue";
import DrawerMenu from "../drawer/menu/default.vue";
import ModalConflict from "../modal/conflict/default.vue";
import SpaceFooter from "../space/footer/default.vue";
import SpaceNav from "../space/nav/default.vue";
import SpaceNavMenu from "../space/nav-menu/default.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        // DIY
        DiyStructure,

        DrawerCart,
        DrawerMenu,
        ModalConflict,
        SpaceFooter,
        SpaceNav,
        SpaceNavMenu
    },

    computed: {
        defaultConfig() {
            return {
                footer: {},
                nav: {},
                navMenu: {}
            };
        }
    },

    mixins: [prefab],

    name: "StructureDefault",

    props: {
        configKey: {
            default: "structure",
            type: String
        },

        id: {
            default: "structure",
            type: String
        }
    }
};
</script>

<template>
    <DiyStructure :id="id" v-bind="computedConfig">
        <SpaceNavMenu
            :config="computedConfig.navMenu"
            config-key="spaces.nav_menu"
            id="nav-menu"
        />

        <SpaceNav
            :config="computedConfig.nav"
            config-key="spaces.nav"
            id="nav"
        />

        <slot></slot>

        <SpaceFooter
            :config="computedConfig.footer"
            config-key="spaces.footer"
            id="footer"
        />

        <DrawerMenu
            config-key="drawers.menu"
            id="drawer-menu"
        />

        <DrawerCart
            config-key="drawers.cart"
            id="drawer-cart"
        />

        <ModalConflict
            config-key="modals.conflict"
            id="modal-conflict"
        />
    </DiyStructure>
</template>
