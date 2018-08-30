<script>
// Components
import DiyButton from "@core/components/diy/button.vue";
import DiyButtonGroup from "@core/components/diy/button-group.vue";
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";
import DiyAccordion from "@core/components/diy/accordion.vue";

// Libraries
import merge from "lodash/merge";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyAccordion,
    DiyButton,
    DiyButtonGroup,
    DiyCollection,
    DiyHeading,
    DiyMarkdown,
    DiySpace
  },

  computed: {
    buttonGroupItemsComp() {
      let buttons = [];
      buttons = this.computedConfig.sections.map(i => i.tabButton);
      buttons.forEach((i, index) => {
        i.handleClick= async () => {
            await this.selectTab(index)
        }
      })
      return buttons;
    },
    baseConfig() {
      return {
        buttons: merge(
          {},
          {
            block: this.buttonsBlock,
            buttonExtensionClasses: this
            .buttonsButtonExtensionClasses,
            handleClick: this.buttonsHandleClick,
            id: this.id + "-buttons",
            items: this.buttonsItems,
            show: this.buttonsShow,
            slot: this.buttonsSlot
          },
          this.buttons
        ),
        description: merge(
          {},
          {
            content: this.descriptionContent,
            id: this.id + "-description",
            markdownExtensionClasses: this
            .descriptionMarkdownExtensionClasses,
            show: this.descriptionShow,
            slot: this.descriptionSlot
          },
          this.description
        ),
        space: merge(
          {
            asideExtensionClasses: this.spaceAsideExtensionClasses,
            id: this.id + "-space",
            mainExtensionClasses: this.spaceMainExtensionClasses,
            show: this.spaceShow,
            wrapperExtensionClasses: this
            .spaceWrapperExtensionClasses,
            mainExtensionClasses: "d-flex",
            footerExtensionClasses: "text-center my-4 d-flex"
          },
          this.space
        ),

        title: merge(
          {},
          {
            content: this.titleContent,
            headingExtensionClasses: this
            .titleHeadingExtensionClasses,
            id: this.id + "-title",
            show: this.titleShow,
            slot: this.titleSlot,
            type: this.titleType
          },
          this.title
        ),
      };
    },
    defaultConfig() {
      return this.baseConfig;
    }
  },

  data() {
    return {
      activeIndex: 0,
    }
  },

    mixins: [prefab],

    props: {
      accordion: {
        default: null,
        type: Array
      },
      buttons: {
        default: null,
        type: Object
      },

      buttonsBlock: {
        default: true,
        type: Boolean
      },

      buttonsButtonExtensionClasses: {
        default: "btn-primary",
        type: String
      },

      buttonsHandleClick: {
        default: null,
        type: Function
      },

      buttonsItems: {
        default: null,
        type: Array
      },

      buttonsSlot: {
        default: "footer",
        type: String
      },

      buttonsShow: {
        default: true,
        type: Boolean
      },

      configKey: {
        default: "spaces.callout_youtube",
        type: String
      },

      description: {
        default: null,
        type: Object
      },

      descriptionContent: {
        default: null,
        type: String
      },

      descriptionMarkdownExtensionClasses: {
        default: "pb-3",
        type: String
      },

      descriptionShow: {
        default: true,
        type: Boolean
      },

      descriptionSlot: {
        default: "main-body",
        type: String
      },

      space: {
        default: null,
        type: Object
      },

      spaceAsideExtensionClasses: {
        default: "my-auto p-3",
        type: String
      },

      spaceMainExtensionClasses: {
        default: "my-auto p-3",
        type: String
      },

      spaceShow: {
        default: true,
        type: Boolean
      },

      spaceWrapperExtensionClasses: {
        default: "py-3",
        type: String
      },

      title: {
        default: null,
        type: Object
      },

      titleContent: {
        default: null,
        type: String
      },

      titleHeadingExtensionClasses: {
        default: "mb-3",
        type: String
      },

      titleShow: {
        default: true,
        type: Boolean
      },

      titleSlot: {
        default: "main-header",
        type: String
      },

      titleType: {
        default: "h2",
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

    <DiyAccordion accordionExtensionClasses="py-4 mx-0 w-100" :data-index="index" :id="accordionItem.accordionTitle" :show-numbers="true" :show-toggle-text="false" :show-toggle-icons="true"  :items="accordionItem.accordionItems" v-if="activeIndex === index" v-for="(accordionItem, index) in computedConfig.accordion" :key="index" />
  </div>

  <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
      <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
  </DiyCollection>

  </DiySpace>
  </template>
