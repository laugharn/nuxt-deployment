<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyList from "@core/components/diy/list.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyButtonGroup from "@core/components/diy/button-group.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyButton,
    DiyImage,
    DiyList,
    DiyButtonGroup,
    DiyCollection,
    DiyHeading,
    DiySpace
  },

  computed: {
    buttonGroupItemsComp() {
      let buttons = [];
      buttons = this.computedConfig.sections.map(i => i.tabButton);
      buttons.forEach((i, index) => {
        i.handleClick = async () => {
          await this.selectTab(index);
        };
      });
      return buttons;
    },
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
          mainExtensionClasses: "d-flex",
          footerExtensionClasses: "text-center my-4 d-flex"
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

  data() {
    return {
      activeIndex: 0
    };
  },

  mixins: [prefab],

  props: {
    configKey: {
      default: "spaces.tabbed",
      type: String
    }
  },
  methods: {
    selectTab(targetTab) {
      this.activeIndex = targetTab;
    }
  }
};
</script>

<template>
  <DiySpace v-bind="computedConfig.space">
    <div slot="header" class="d-flex mx-auto">
      <DiyButtonGroup :buttons="buttonGroupItemsComp" :groupExtensionClasses="`btn-group d-flex justify-content-center mx-auto`" :activeIndex="activeIndex"/>
    </div>

    <div slot="body" class="wrapper d-flex align-items-stretch">
      <div class="content" v-for="(content, i) in computedConfig.sections" v-if="activeIndex === i" :key="i">
        <DiyHeading v-bind="content.title" />
        <DiyCollection v-bind="content">
          <div slot-scope="item" v-bind="item" class="d-md-flex">
            <DiyImage v-bind="item.image" v-if="item.image" />
            <div class="col">
              <DiyHeading v-bind="item.title" />
              <div class="content" v-html="item.content"></div>
            </div>
          </div>
        </DiyCollection>
      </div>
    </div>

    <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>

  </DiySpace>
</template>
