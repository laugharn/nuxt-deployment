<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";

// Prefab
import Callout from "./image.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyList
    },

    computed: {
        defaultConfig() {
            return merge(this.extendConfig, {
                description: {
                    show: false
                },

                list: {
                    id: this.id + "-list",
                    slot: "main-body"
                },

                logo: {
                    id: this.id + "-logo",
                    slot: "main-header",
                    show: false
                }
            });
        }
    },

    extends: Callout
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyImage v-bind="computedConfig.logo" />
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyList v-bind="computedConfig.list" />
        <DiyImage v-bind="computedConfig.image" />
    </DiySpace>
</template>
