<script>
// Prefab
import Callout from "./default.vue";

import merge from "lodash/merge";

export default {
    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                description: {
                    markdownExtensionClasses: "pb-0"
                },
                space: {
                    asideExtensionClasses: "d-none",
                    mainExtensionClasses: "col-md-8 m-auto text-center",
                    wrapperExtensionClasses: "p-0"
                }
            });
        }
    },

    extends: Callout
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" v-if="computedConfig.title.content" />
        <DiyMarkdown v-bind="computedConfig.description" v-if="computedConfig.description.content" />
    </DiySpace>
</template>
