<script>
// Components
// DIY
import DiyAccordion from "@core/components/diy/accordion.vue";

// Prefab
import Features from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyAccordion
    },

    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                space: {
                    wrapperExtensionClasses: "py-3"
                }
            });
        }
    },

    extends: Features
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyAccordion v-bind="computedConfig.features" />
    </DiySpace>
</template>
