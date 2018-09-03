<script>
// Components
// DIY
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Prefab
import Form from "~/components/prefab/form/iterable/default.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import deepGet from "@core/assets/js/utils/deepGet";

export default {
    components: {
        DiyMarkdown,
        DiySpace,

        Form
    },

    computed: {
        baseConfig() {
            return {
                description: {
                    content: `Ready to get going? Hit the ground running with everything you need to know to advance your career in real estate.`,
                    id: this.id + "-description",
                    markdownExtensionClasses: "font-size-sm mb-3",
                    slot: "main-footer"
                },

                form: {
                    buttonContent: "Subscribe",
                    id: this.id + "-form",
                    listId: 33954,
                    slot: "aside"
                },

                space: {
                    asideExtensionClasses: "col-md-6 my-auto py-3",
                    bodyHeaderExtensionClasses: "d-flex justify-content-end",
                    id: this.id,
                    mainExtensionClasses: "col-md-6 my-auto py-3",
                    sticky: true,
                    stickyExtensionClasses: "sticky-top",
                    wrapperExtensionClasses:
                        "bg-white border-bottom border-light"
                },

                success: {
                    content: "Thank you for subscribing!",
                    id: this.id + "-success",
                    slot: "aside"
                },

                title: {
                    content:
                        "Learn more about real estate licensing and get exclusive offers",
                    id: this.id + "-title",
                    slot: "main-header",
                    type: "h3"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    data() {
        return {
            subscribed: false
        };
    },

    mixins: [prefab],

    async mounted() {
        this.$nuxt.$on(String(this.computedConfig.form.listId), async () => {
            this.subscribed = true;
        });
    },

    props: {
        configKey: {
            default: "spaces.capture",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyMarkdown v-bind="computedConfig.title" />
        <Form v-bind="computedConfig.form" v-if="!subscribed" />
        <DiyMarkdown v-bind="computedConfig.success" v-if="subscribed" />
    </DiySpace>
</template>
