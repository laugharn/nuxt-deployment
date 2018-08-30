<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
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
          id: this.id + "-space",
          mainExtensionClasses: "my-auto p-3"
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

  mixins: [prefab]
};
</script>

<template>
  <DiySpace v-bind="computedConfig.space">
    <DiyHeading v-bind="computedConfig.title" />
    <div class="row" slot="main">
      <div class="col-md text-center" v-for="(contact, i) in computedConfig.contacts">
        {{ contact.content }} <br/>
        <a :href="`tel://{contact.phone}`" class="font-weight-bold" v-if="contact.phone">{{ contact.phone }}</a>
        <a :href="`mailto://{contact.email}`" class="font-weight-bold" v-if="contact.email">{{ contact.email }}</a>
      </div>
    </div>
    <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>
  </DiySpace>
</template>
