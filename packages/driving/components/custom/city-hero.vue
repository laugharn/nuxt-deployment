<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiyPricing from "@core/components/diy/pricing.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyButton,
    DiyImage,
    DiyCollection,
    DiyHeading,
    DiyMarkdown,
    DiyPricing,
    DiySpace
  },

  computed: {
    baseConfig() {
      return {
        buttons: {
          buttonExtensionClasses: "btn-primary",
          id: this.id + "-buttons",
          slot: "main-footer"
        },
        description: {
          id: this.id + "-description",
          markdownExtensionClasses: "pb-3",
          slot: "main-body"
        },
        pricing: {
          id: this.id + "-pricing",
          pricingExtensionClasses: "pb-3",
          slot: "main-body"
        },
        space: {
          asideExtensionClasses: "my-auto p-3",
          id: this.id + "-space",
          mainExtensionClasses: "my-auto p-3",
          wrapperExtensionClasses: "py-3"
        },
        title: {
          headingExtensionClasses: "mb-3",
          id: this.id + "-title",
          slot: "header"
        },
        subtitle: {
          id: this.id + "-subtitle",
          slot: "main-header",
          type: "h3"
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
      default: "spaces.hero",
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";
.preferred {
  border: solid 1px theme-color("primary");
  border-radius: 30px;
}
</style>

<template>
  <DiySpace v-bind="computedConfig.space">
    <DiyHeading v-bind="computedConfig.title" />

    <DiyHeading v-bind="computedConfig.subtitle" />
    <DiyMarkdown v-bind="computedConfig.description" />
    <DiyPricing v-bind="computedConfig.pricing" />
    <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>

    <DiyCollection v-bind="computedConfig.afterFooter">
      <div slot-scope="item" v-bind="item" class="d-flex">
        <DiyImage v-bind="item.image" v-if="item.image" />
        <div class="col">
          <DiyHeading v-bind="item.title" />
          <div class="content" v-html="item.content"></div>
        </div>
      </div>
    </DiyCollection>


    <div class="col-md" slot="footer">
      <h4>ONLY ONLINE COURSE WITH A TOP-RATED APP</h4>
      <div class="w-75 mx-auto">
        <div class="d-md-flex preferred justify-content-between py-2 my-2 px-4 text-primary font-weight-bold">
          <div class="name">Aceable</div>
          <div class="rating">4.9/5</div>
        </div>
        <div class="d-md-flex justify-content-between py-2 my-2 px-4">

          <div class="name">DriversEd.com</div>
          <div class="rating">3/5 (Limited Features)</div>
        </div>
        <div class="d-md-flex justify-content-between py-2 my-2 px-4">
          <div class="name">iDriveSafely</div>
          <div class="rating">No App</div>
        </div>

        <div class="d-md-flex justify-content-between py-2 my-2 px-4">

          <div class="name">MyCaliforniaPermit</div>
          <div class="rating">No App</div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center border-bottom-1 my-4">
      <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
        <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
      </DiyCollection>
    </div>
    </div>
  </DiySpace>
</template>
