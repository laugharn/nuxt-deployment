<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton,
        DiyCollection,
        DiyHeading,
        DiyMarkdown,
        DiySpace
    },

    computed: {
        baseConfig() {
            return {
                buttons: {
                    block: true,
                    buttonExtensionClasses: "btn-primary",
                    id: this.id + "-buttons",
                    slot: "main-footer"
                },

                description: {
                    id: this.id + "-description",
                    markdownExtensionClasses: "pb-3",
                    marked: true,
                    slot: "main-body"
                },

                space: {
                    asideExtensionClasses: "my-auto p-3",
                    id: this.id,
                    mainExtensionClasses: "my-auto p-3",
                    wrapperExtensionClasses: "py-3"
                },

                title: {
                    headingExtensionClasses: "mb-3",
                    id: this.id + "-title",
                    slot: "main-header"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        },

        loadingConfig() {
            return {
                space: {
                    id: this.id,
                    show: false
                }
            };
        }
    },

    data() {
        return {
            loading: false
        };
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.callout",
            type: String
        },

        id: {
            default: "callout",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
            <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" :id="id + '-button'" slot-scope="item" v-bind="item" />
        </DiyCollection>
    </DiySpace>
</template>
