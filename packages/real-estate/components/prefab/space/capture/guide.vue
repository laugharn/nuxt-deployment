<script>
import DiyHeading from "@core/components/diy/heading.vue";
import Capture from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyHeading
    },

    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                form: {
                    buttonText: "Get the Guide"
                },

                space: {
                    asideExtensionClasses: "my-auto py-3",
                    sticky: false,
                    wrapperExtensionClasses: "bg-dark py-3 text-white"
                },

                title: {
                    content: `Want to know more about being a real estate agent in Texas?`,
                    headingExtensionClasses: "mb-3"
                }
            });
        }
    },

    extends: Capture
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <Form v-bind="computedConfig.form" v-if="!subscribed" />
        <DiyMarkdown v-bind="computedConfig.success" v-if="subscribed" />
    </DiySpace>
</template>
