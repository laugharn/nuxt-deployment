<script>
// Components
// DIY
import DiyYoutube from "@core/components/diy/youtube.vue";

// Prefab
import callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyYoutube
    },

    computed: {
        defaultConfig() {
            return this.extendConfig;
        },

        extendConfig() {
            return merge(this.baseConfig, {
                youtube: {
                    id: this.id + "-youtube",
                    slot: "aside"
                }
            });
        }
    },

    extends: callout
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
            <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
        </DiyCollection>

        <DiyYoutube v-bind="computedConfig.youtube" />
    </DiySpace>
</template>
