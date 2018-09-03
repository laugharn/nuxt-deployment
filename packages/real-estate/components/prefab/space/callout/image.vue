<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";

// Prefab
import Callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyImage
    },

    computed: {
        defaultConfig() {
            return this.extendConfig;
        },

        extendConfig() {
            return merge(this.baseConfig, {
                image: {
                    id: this.id + "-image",
                    params: "w=720&auto=compress",
                    slot: "aside"
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
        <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
            <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
        </DiyCollection>

        <DiyImage v-bind="computedConfig.image" />
    </DiySpace>
</template>
