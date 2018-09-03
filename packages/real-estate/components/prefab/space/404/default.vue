<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiyImage from "@core/components/diy/image.vue";
import DiySpace from "@core/components/diy/space.vue";

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
                description: {
                    content:
                    deepGet(
                      this.$store.state.page.content,
                      "spaces.hero.description"
                    ),
                    marked: true
                },
                h1: {
                    content: "Oops! Wrong addresss!",
                    type: "h1",
                    headingExtensionClasses: ""
                },
                h2: {
                    content: "We couldn't find the page you were looking for.",
                    type: "h2"
                },
                image: {
                    id: this.name + "-image",
                    src: "/uploads/sites/2/2018/08/404-house.png",
                    params: "?w=700&auto=compress"
                },
                space: {
                    wrapperExtensionClasses: this.name + " bg-brand-to-success text-white"
                },
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab],

    props: {
        id: {
            default: "page-404",
            type: String
        },

        name: {
          default: "page-404",
          type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <div :class="name + '__wrapper container'">
        <div :class="name + '__title1'">
          <DiyHeading v-bind="computedConfig.h1" />
        </div>
        <div :class="name + '__title2'">
          <DiyHeading v-bind="computedConfig.h2" />
        </div>
        <div :class="name + '__image'">
          <DiyImage v-bind="computedConfig.image" />
        </div>
        <div :class="name + '__info clearfix'">
          <div :class="name + '__explanation'">
            <h3>This is either because</h3>
            <ul>
              <li>There is an error in the URL entered into your web browser. Please check the URL and try again.</li>
              <li>The page you are looking for has been moved or deleted.</li>
            </ul>
          </div>
          <div :class="name + '__helpful-links'">
            <h3 class="text-black">Helpful Links</h3>
            <ul>
              <li><a href="/">Homepage</a></li>
              <li><a href="/courses/texas/pre-license">Get My License</a></li>
              <li><a href="/courses/texas/continuing-education">Continuing Education</a></li>
              <li><a href="https://app.aceable.com/user/signin">Sign In</a></li>
            </ul>
          </div>
        </div>
      </div>
    </DiySpace>
</template>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.page-404 {
  .page-404__wrapper {
    padding-top: 70px;
    padding-bottom: 70px;
    text-align: center;
  }
}

.page-404 {
  .page-404__wrapper {
    .page-404__title1 {
      margin-bottom: 30px;
      letter-spacing: 1px;
      .Heading {

      }
    }
  }
}

.page-404 {
  .page-404__wrapper {
    .page-404__title2 {
      margin-bottom: 30px;
      color: map-get($grays, 1000);
      .Heading {
        font-weight: 500;
        font-size: 1.8rem;
      }
    }
  }
}

.page-404 {
  .page-404__wrapper {
    .page-404__image {
      max-width: 700px;
      margin: 0 auto;
    }
  }
}

.page-404 {
  .page-404__info {
    background-color: white;
    position: relative;
    bottom: 5px;
    padding: 30px 15px;
    border-radius: 3px;
  }
}

.page-404 {
  .page-404__explanation {
    float: left;
    width: calc(100% - 300px);
    color: map-get($grays, 1000);
    text-align: left;
    font-weight: 500;
    padding-left: 15px;
    padding-right: 15px;
    h3 {
      font-size: 1.2rem;
      font-weight: 600;
      font-style: italic;
    }
    li {
      position: relative;
      list-style: none;
      margin-bottom: 30px;
      &:after {
        content: "\F054";
        position: relative;
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
        margin-right: 10px;
        color: $teal;
        border-color: #12BDCD;
        border-width: 2px;
        border-style: solid;
        padding: 2px 4px 1px 6px;
        border-radius: 50%;
        font-size: 80%;
        position: absolute;
        left: -30px;
        top: 3px;
        font-size: 9px;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .page-404 {
    .page-404__explanation {
        width: 100%;
    }
  }
}

.page-404 {
  .page-404__helpful-links {
    float: left;
    width: 300px;
    padding-left: 15px;
    padding-right: 15px;
    h3 {
      color: map-get($grays, 1000);
      font-size: 1.2rem;
      text-align: left;
    }
    ul {
      list-style: none;
      text-align: left;
      padding-left: 0px;
      margin-bottom: 0px;
      font-size: 1.2rem;
    }
    li {
      margin-bottom: 7px;
    }
    a {
      text-decoration: underline;
      font-weight: 500;
      &:visited, &:hover, &:active {
        color: #12BDCD;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .page-404 {
    .page-404__helpful-links {
        width: 100%;
        h3 {
          text-align: center;
        }
        ul {
          text-align: center;
        }
    }
  }
}
</style>
