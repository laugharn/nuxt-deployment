<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
  components: {
    DiyList,
    DiyMarkdown,
    DiySpace
  },

  computed: {
    defaultConfig() {
      return {
        address: this.address,
        copyright: this.copyright,
        links: this.links,
        space: this.space
      };
    }
  },

  mixins: [prefab],

  name: "SpaceFooter",

  props: {
    address: {
      default() {
        return {
          inline: true,
          items: [
            {
              content: "610 WEST 5TH ST, STE 603",
              showIcon: false
            },
            {
              content: "AUSTIN, TX 78701",
              showIcon: false
            }
          ],
          slot: "body-header"
        };
      },
      type: Object
    },

    configKey: {
      default: "spaces.footer"
    },

    copyright: {
      default() {
        return {
          content: `©2018 Aceable, Inc. All rights reserved.`,
          slot: "body-footer"
        };
      },
      type: Object
    },

    links: {
      default() {
        return {
          inline: true,
          items: [
            {
              content: "Terms & Conditions",
              href: "https://www.aceable.com/tandc/"
            },
            {
              content: " | "
            },
            {
              content: "Privacy Policy",
              href: "https://www.aceable.com/privacy-policy/"
            }
          ],
          slot: "body-header"
        };
      }
    },

    space: {
      default() {
        return {
          wrapperClasses: "Space__wrapper --footer",
          wrapperExtensionClasses:
            "bg-dark font-size-sm py-5 text-center text-white"
        };
      },
      type: Object
    }
  }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyList v-bind="computedConfig.links" />
        <DiyList v-bind="computedConfig.address" />
        <DiyMarkdown v-bind="computedConfig.copyright" />
    </DiySpace>
</template>
