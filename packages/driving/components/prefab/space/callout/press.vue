<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyButton,
    DiyCollection,
    DiyHeading,
    DiyImage,
    DiyMarkdown,
    DiySpace
  },

  computed: {
    baseConfig() {
      return {
        buttons: {
          id: this.id + "-buttons"
        },

        description: {
          id: this.id + "-description"
        },
        space: {
          id: this.id + "-space"
        },

        title: {
          id: this.id + "-title"
        }
      };
    },

    defaultConfig() {
      return this.baseConfig;
    }
  },

  mixins: [prefab],

  props: {
    configKey: {
      default: "spaces.press",
      type: String
    },
    id: {
      default: "press",
      type: String
    }
  }
};
</script>

<template>
  <DiySpace v-bind="computedConfig.space">
    <DiyHeading v-bind="computedConfig.title" />
    <DiyCollection v-bind="computedConfig.images" v-if="computedConfig.images.items">
      <DiyImage v-bind="item" slot-scope="item" />
    </DiyCollection>
    <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>
  </DiySpace>
</template>
