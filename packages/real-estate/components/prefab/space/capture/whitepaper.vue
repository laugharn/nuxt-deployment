<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";

// Prefab
import Capture from "./default.vue";
import Form from "~/components/prefab/form/iterable/whitepaper.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyHeading,

        Form
    },

    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                description: {
                    content:
                        "Ready to get going? Hit the ground running with everything you need to know to advance your career in real estate.",
                    id: this.id + "-description",
                    slot: "main-header"
                },

                form: {
                    slot: "main-body"
                },

                space: {
                    asideExtensionClasses: "d-none",
                    mainExtensionClasses: "col-md-12 p-3",
                    wrapperExtensionClasses: "bg-secondary text-white py-3"
                },

                title: {
                    content:
                        "Want to read more? Fill out this form to get your guide!",
                    headingExtensionClasses: "mb-0",
                    slot: "main-header",
                    type: "h2"
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
        <Form v-bind="computedConfig.form" />
    </DiySpace>
</template>
