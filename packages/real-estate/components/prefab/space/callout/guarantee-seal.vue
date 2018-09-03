<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";
import DiyImage from "@core/components/diy/image.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyMarkdown,
        DiyImage,
        DiySpace,
    },

    computed: {
        baseConfig() {
            return {
                seal: {
                  image: {
                    src: "/uploads/sites/2/2018/08/aceable-guarantee-logo.png",
                    params: "w=135&auto=compress",
                  },
                },
                description: {
                    content: "Still wondering if you can do it? The heart of our school is your success and we offer a world-class team that is trained to walk you through the process, guide you through real world examples, and give you the tools necessary to succeed after you’ve passed the exam. And if for some reason you don’t pass we will gladly refund your course.  It’s time to take advantage of our booming real estate market and make the career move. With unlimited earning potential and the flexibility of making your own schedule, there has never been a better time to be a real estate agent in Texas.",
                    marked: true
                },

                title: {
                    content: "Ace the test …. guaranteed",
                    markdownExtensionClasses: "h2"
                },

                space: {
                    wrapperExtensionClasses: this.id + ""
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
            default: "spaces.guarantee",
            type: String
        },

        id: {
            default: "guarantee-seal",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <div :class="id + '__wrapper container'">
        <div :class="id + '__image'">
          <DiyImage v-bind="computedConfig.seal.image" />
        </div>
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

.guarantee-seal {

}

.guarantee-seal {
  .guarantee-seal__wrapper {
    padding-top: 70px;
    padding-bottom: 70px;
    text-align: center;
  }
}

.guarantee-seal {
  .guarantee-seal__wrapper {
    .guarantee-seal__image {
      .Image {
        margin: 0 auto;
        margin-bottom: 40px;
      }
    }
  }
}

.guarantee-seal {
  .guarantee-seal__wrapper {
    .guarantee-seal__title {
      margin-bottom: 30px;
    }
  }
}

@include media-breakpoint-down(sm) {
  .guarantee-seal {
    .guarantee-seal__wrapper {
      .guarantee-seal__title {
        text-align: center;
        font-size: 26px;
      }
    }
  }
}

.guarantee-seal {
  .guarantee-seal__wrapper {
    .guarantee-seal__description {
      line-height: 1.8;
      text-align: left;
    }
  }
}
</style>
