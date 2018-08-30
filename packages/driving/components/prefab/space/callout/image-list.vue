<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";
import DiyList from "@core/components/diy/list.vue";

// Prefab
import Callout from "./image.vue";

// Libraries
import merge from "lodash/merge";

export default {
  components: {
    DiyImage,
    DiyList
  },

  computed: {
    defaultConfig() {
      return merge({}, this.extendConfig, {
        list: {
          items: this.listItems,
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
    <DiyImage v-bind="computedConfig.image" />
    <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>
  </DiySpace>
</template>
