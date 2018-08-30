<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyQuote from "@core/components/diy/quote.vue";
import DiySpace from "@core/components/diy/space.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyButton from "@core/components/diy/button.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyButton,
    DiyCollection,
    DiyHeading,
    DiyQuote,
    DiySpace,
    DiyImage
  },

  computed: {
    baseConfig() {
      return {
        buttons: {
          id: this.id + "-buttons"
        },

        space: {
          id: this.id + "-space"
        },
        title: {
          id: this.id + "-title"
        },

        image: {
          id: this.id + "-image"
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
      default: "spaces.testimonial",
      type: String
    },

    id: {
      default: "testimonial",
      type: String
    }
  }
};
</script>

  <template>
    <DiySpace v-bind="computedConfig.space">
      <DiyHeading v-bind="computedConfig.title" />
        <div class="row d-md-flex d-block" slot="body">
          <div class="col" :class="quote.cardClasses" v-for="(quote, i) in computedConfig.quotes">
            <div class="card m-2 p-4">
              <DiyImage v-bind="quote.image" />
              <div :class="quote.sourceClasses">{{ quote.source }}</div>
              <p :class="quote.bodyClasses">{{ quote.content }}</p>
            </div>
          </div>
        </div>
        <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
          <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
      </DiyCollection>
    </DiySpace>
  </template>
