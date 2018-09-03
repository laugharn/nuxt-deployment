<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyMarkdown,
        DiySpace,
    },

    computed: {
        baseConfig() {
            return {
                description: {
                    content:
                    deepGet(
                      this.$store.state.page.content,
                      "spaces.hero.description"
                    ),
                    marked: true
                },

                title: {
                    content: deepGet(
                        this.$store.state.page.content,
                        "spaces.hero.title.content",
                        "seo.title",
                        "post_title"
                    ),
                    markdownExtensionClasses: "h1"
                },
                space: {
                    wrapperExtensionClasses: this.id + " bg-brand-to-success text-white"
                },
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
        },

        id: {
            default: "hero-title-text",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <div :class="id + '__wrapper container'">
        <div :class="id + '__title'">
          <DiyMarkdown v-bind="computedConfig.title" />
        </div>
        <div :class="id + '__description'">
          <DiyMarkdown v-bind="computedConfig.description" />
        </div>
      </div>
    </DiySpace>
</template>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.hero-title-text {
  .hero-title-text__wrapper {
    padding-top: 70px;
    padding-bottom: 70px;
    text-align: center;
  }
}

.hero-title-text {
  .hero-title-text__wrapper {
    .hero-title-text__title {
      margin-bottom: 50px;
    }
  }
}

@include media-breakpoint-down(md) {
  .hero-title-text {
    .hero-title-text__wrapper {
      .hero-title-text__title {
        text-align: left;
      }
    }
  }
}
@include media-breakpoint-down(sm) {
  .hero-title-text {
    .hero-title-text__wrapper {
      .hero-title-text__title {
        font-size: 30px;
      }
    }
  }
}

.hero-title-text {
  .hero-title-text__wrapper {
    .hero-title-text__description {
      line-height: 1.8;
    }
  }
}

@include media-breakpoint-down(md) {
  .hero-title-text {
    .hero-title-text__wrapper {
      .hero-title-text__description {
        text-align: left;
      }
    }
  }
}
</style>
