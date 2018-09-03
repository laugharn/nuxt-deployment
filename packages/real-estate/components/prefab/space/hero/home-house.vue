<script>
import DiyHeading from "@core/components/diy/heading.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyImage,
        DiyMarkdown,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                description: {
                    id: this.id + "-description",
                    markdownExtensionClasses: "text-center",
                    marked: true,
                    markdownExtensionClasses: "home-house-hero-description-markdown"
                },
                image: {
                    id: this.id + "-image",
                    src: "/uploads/sites/2/2018/08/homepage-hero-house.png?w=1020&auto=compress",
                    imageExtensionClasses: "home-house-hero-img"
                },
                space: {
                    id: this.id,
                    wrapperExtensionClasses: "home-house-hero bg-brand-to-success py-4 text-white"
                },
                title: {
                    id: this.id + "-title",
                    type: "h1",
                    headingExtensionClasses: "home-house-hero-toptext-heading"
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.hero",
            type: String
        },

        id: {
            default: "hero",
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.home-house-hero {
  .home-house-hero-toptext-heading {
    text-align: center;
  }
}

.home-house-hero {
  .home-house-hero-toptext-markdown {
    font-weight: 300;
  }
}

.home-house-hero{
  .home-house-hero-img {
    margin-top: -90px;
    margin-bottom: 20px;
  }
}

.home-house-hero{
  .home-house-hero-description-markdown {
    font-weight: 300;
    line-height: 1.8;
    text-align: center;
    margin-bottom: 20px;
    strong {
      font-weight: bold;
    }
  }
}

@include media-breakpoint-down(md) {
  .home-house-hero {
    .home-house-hero-toptext-heading {
      font-size: 2rem;
    }
  }
}

@include media-breakpoint-down(sm) {
  .home-house-hero {
    .home-house-hero-toptext-heading {
      font-size: 1.8rem;
    }
  }

  .home-house-hero {
    .home-house-hero-img {
      margin-top: -40px;
    }
  }
}
</style>

<template>
    <DiySpace v-bind="computedConfig.space">
        <div class="container">
            <div class="row">
                <div class="col-12 align-items-center d-flex flex-column home-house-hero-toptext">
                    <DiyHeading v-bind="computedConfig.title" />
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-10 col-lg-7 mx-auto p-3">
                    <DiyImage v-bind="computedConfig.image" />
                </div>
            </div>
            <div class="row">
                <div class="col-12 align-items-center d-flex flex-column">
                    <DiyMarkdown v-bind="computedConfig.description" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-sm-8 col-md-4 col-lg-3 pb-2">
                    <a class="btn btn-block btn-convert" @click.prevent="$store.dispatch('page/goTo', '/courses/texas/pre-license/')" href="/courses/texas/pre-license/">Get My License <small class="fab fa-chevron-right"></small></a>
                </div>
                <div class="col-12 col-sm-8 col-md-4 col-lg-3 pb-2">
                    <a class="btn btn-block btn-convert" @click.prevent="$store.dispatch('page/goTo', '/courses/texas/continuing-education/')" href="/courses/texas/continuing-education/">Continuing Education <small class="fab fa-chevron-right"></small></a>
                </div>
            </div>
        </div>
    </DiySpace>
</template>
