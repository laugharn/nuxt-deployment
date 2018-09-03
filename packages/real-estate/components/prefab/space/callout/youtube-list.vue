<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";

// Prefab
import Callout from "./youtube.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyList
    },

    computed: {
        defaultConfig() {
            return this.loading
                ? {
                      space: {
                          show: false
                      }
                  }
                : merge(this.extendConfig, {
                      description: {
                          show: false
                      },

                      list: {
                          id: this.id + "-list",
                          slot: "main-body"
                      }
                  });
        }
    },

    extends: Callout
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyList v-bind="computedConfig.list" />
        <DiyYoutube v-bind="computedConfig.youtube" />
    </DiySpace>
</template>
