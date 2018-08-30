<script>
// Components
// DIY
import DiyStructure from "@core/components/diy/structure.vue";

// Prefab
import SpaceFooter from "../space/footer/default.vue";
import SpaceNav from "../space/nav/partner.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyStructure,

        SpaceFooter,
        SpaceNav
    },

    mixins: [prefab],

    name: "StructurePartner",

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
    <DiyStructure v-bind="computedConfig">
        <SpaceNav v-bind="computedConfig.nav" slot="header" />
        <slot></slot>
        <SpaceFooter v-bind="computedConfig.footer" slot="footer" />
    </DiyStructure>
</template>
