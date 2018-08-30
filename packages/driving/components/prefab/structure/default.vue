<script>
// Components
// DIY
import DiyStructure from "@core/components/diy/structure.vue";

// Prefab
import SpaceFooter from "../space/footer/default.vue";
import SpaceNav from "../space/nav/default.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        // DIY
        DiyStructure,

        SpaceFooter,
        SpaceNav
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
    <DiyStructure v-bind="computedConfig">
        <SpaceNav :config="computedConfig.nav" slot="header" />
        <slot></slot>
        <SpaceFooter :config="computedConfig.footer" slot="footer" />
    </DiyStructure>
</template>
