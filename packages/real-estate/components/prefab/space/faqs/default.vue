<script>
// Components
// DIY
import DiyAccordion from "@core/components/diy/accordion.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyAccordion,
        DiyHeading,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                accordion: {
                    id: this.id + "-accordion",
                    slot: "body-footer"
                },

                space: {
                    id: this.id
                },

                title: {
                    content: "Frequently asked questions",
                    id: this.id + "-title",
                    slot: "body-header",
                    type: "h2"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceFaqs",

    props: {
        configKey: {
            default: "spaces.faqs"
        },

        id: {
            default: "faqs"
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyAccordion v-bind="computedConfig.accordion" />
    </DiySpace>
</template>
