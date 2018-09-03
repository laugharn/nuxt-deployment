<script>
// Components
// DIY
import DiyHeading from "@core/components/diy/heading.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";
import DiyTable from "@core/components/diy/table.vue";
import DiyImage from "@core/components/diy/image.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyHeading,
        DiyImage,
        DiyMarkdown,
        DiySpace,
    },

    computed: {
        baseConfig() {
            return {
                space: {
                    wrapperExtensionClasses: "compare-school",
                    id: this.id,
                    backgroundImage: "/uploads/sites/3/2018/03/Fotolia_144718558_Subscription_Monthly_M.jpg?w=1440&blend=000000&balph=67&bm=darken&auto=compress",
                    showBackgroundImage: true,
                },
                table: {
                  headData: [
                    {
                      data: "title",
                      content: "School"
                    },
                    {
                      data: "image",
                      src: "/uploads/sites/2/2018/08/champions-logo-icon.png",
                      params: "w=45&auto=compress",
                    },
                    {
                      data: "image",
                      src: "/uploads/sites/2/2018/08/aceable-logo-icon.png",
                      params: "w=45&auto=compress",
                    }
                  ],
                  bodyData: [
                    {
                      item: [
                        {content: "Price"},
                        {content: "$945"},
                        {content: "$497"},
                      ]
                    },
                    {
                      item: [
                        {content: "Pass rate"},
                        {content: "58%"},
                        {content: "95%"},
                      ]
                    },
                    {
                      item: [
                        {content: "Take anywhere, on any device"},
                        {content: "no"},
                        {content: "yes"},
                      ]
                    },
                    {
                      item: [
                        {content: "Money-back guarantee"},
                        {content: "5 days"},
                        {content: "30 days or if you fail exam"},
                      ]
                    }
                  ]
                },
                descriptions: {
                  school1: {
                    image: {
                      src: "/uploads/sites/2/2018/08/champions-logo-large.png",
                      params: "w=290&auto=compress",
                    },
                    description: {
                      content: "Champions is first and foremost a classroom-based learning institution. Instead of offering a full, interactive online experience, their courses are presented in the form of a downloadable PDF textbook and separate online chapter quizzes. While this can technically get the job done, this format lacks the instructional design and advanced learning tools that people today have come to expect. Having only a 58% pass rate and a high price tag, it’s time to update the way we learn about real estate for the 21st century.",
                      marked: true,
                      backgroundColor: "white"
                    },
                    color: "#EC5164"

                  },
                  school2: {
                    image: {
                      src: "/uploads/sites/2/2018/08/aceable-logo-large.png",
                      params: "w=190&auto=compress",
                    },
                    description: {
                      content: "Luckily, there is now a better option. AceableAgent's pre-license courses come with groundbreaking features to help you pass the exam. From the comfort of your home, you can learn on any device with the aid of engaging video content, illustrations, memes, and access to real agents with the knowledge and experience to guide you down the path to success. We offer all of this at around half the cost of Champions, and for those who need it payment plans are available. Our first priority is getting you on your way to your new career, so we want to make learning affordable for everyone.",
                      marked: true,
                      backgroundColor: "#F0F5FA"
                    },
                    color: "#48CFAD"
                  },
                  legalText: {
                    content: "Pass rates as of 08/08/2018  |  Pricing as of 8/08/2018"
                  }
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
            default: "spaces.compare-schools",
            type: String
        },

        id: {
            default: "compare-school",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <div :class="id + '__table'">
        <table class="Table">
          <thead class="Table__thead">
              <tr class="Table__thead-tr">
                <th class="Table__thead-th" :key="thIndex" v-for="(th, thIndex) in computedConfig.table.headData">
                  <DiyMarkdown v-bind="th" v-if="th.data == 'title'" />
                  <DiyImage v-bind="th" v-if="th.data == 'image'" />
                </th>
              </tr>
          </thead>
          <tbody class="Table__tbody">
            <template v-for="(tr, trIndex) in computedConfig.table.bodyData">
              <tr class="Table__tbody-tr Table__tbody-tr-mobile-row" :key="trIndex"> <!-- special mobile row -->
                <td class="Table__tbody-th" colspan="3" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 0"> <!-- got to do it twice cause the first one gets display none, frontend :) -->
                  <DiyMarkdown v-bind="td" />
                </td>
                <td class="Table__tbody-th" colspan="3" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 0">
                  <DiyMarkdown v-bind="td" />
                </td>
              </tr>
              <template v-if="trIndex % 2 == 0"> <!-- odd tr -->
                <tr class="Table__tbody-tr Table__tbody-tr-odd" :key="trIndex">
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 0">
                    <DiyMarkdown v-bind="td" />
                  </td>
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 1" :style="'color: ' + computedConfig.descriptions.school1.color ">
                    <DiyMarkdown v-bind="td" />
                  </td>
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 2" :style="'color: ' + computedConfig.descriptions.school2.color ">
                    <DiyMarkdown v-bind="td" />
                  </td>
                </tr>
              </template>
              <template v-else> <!-- odd tr -->
                <tr class="Table__tbody-tr Table__tbody-tr-even" :key="trIndex">
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 0">
                    <DiyMarkdown v-bind="td" />
                  </td>
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 1" :style="'color: ' + computedConfig.descriptions.school1.color ">
                    <DiyMarkdown v-bind="td" />
                  </td>
                  <td class="Table__tbody-td" :key="tdIndex" v-for="(td, tdIndex) in tr.item" v-if="tdIndex == 2" :style="'color: ' + computedConfig.descriptions.school2.color ">
                    <DiyMarkdown v-bind="td" />
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <div :class="id + '__legal'">
          <DiyMarkdown v-bind="computedConfig.descriptions.legalText" />
        </div>
      </div>
      <div :class="id + '__descriptions container-fluid'">
        <div class="row">
          <div :class="id + '__description col-12 col-md-6'" :style="'background-color:' + computedConfig.descriptions.school1.description.backgroundColor">
            <div :class="id + '__vs-symbol'">VS</div>
            <div :class="id + '__description-inner'">
              <div :class="id + '__image-container'">
                <DiyImage v-bind="computedConfig.descriptions.school1.image" />
              </div>
              <DiyMarkdown v-bind="computedConfig.descriptions.school1.description" />
            </div>
          </div>
          <div :class="id + '__description col-12 col-md-6'" :style="'background-color:' + computedConfig.descriptions.school2.description.backgroundColor">
            <div :class="id + '__description-inner'">
              <div :class="id + '__image-container'">
                <DiyImage v-bind="computedConfig.descriptions.school2.image" />
              </div>
              <DiyMarkdown v-bind="computedConfig.descriptions.school2.description" />
            </div>
          </div>
        </div>
      </div>
    </DiySpace>
</template>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.compare-school__table {
  padding: 40px 60px;
  overflow-x: scroll;
}

@include media-breakpoint-down(md) {
  .compare-school__table {
    padding: 30px 15px;
  }
}

.compare-school {
  .Table {
    background-color: white;
    max-width: 960px;
    margin: 0 auto;

    thead {
      /* Table head row */
      tr {

      }
      /* Table head item */
      th {
        text-align: center;
        border-bottom: none;
      }
      /* Table head with image child */
      th {
        img {
          margin: 0 auto;
        }
      }
      /* Table head, first column item */
      tr {
        th {
          border-right: 1px solid #dee2e6;
        }
        th:first-child {
          color: $teal;
          font-weight: 800;
          text-align: left;
          border-right: 1px solid #dee2e6;
        }
      }

      tr:first-child {
        th:first-child {
          vertical-align: middle;
        }
      }
    }

    tbody {

      /* Table body item */
      td {
        text-align: center;
        border-top: none;
        border-bottom: none;
        border-right: 1px solid #dee2e6;
      }
      /* Table body, column selectors */
      tr {
        /* Table body, first column item */
        td:first-child {
          color: $teal;
          font-weight: 800;
          text-align: left;
        }
        /* Table body, second and third column items */
        td:nth-child(2), td:nth-child(3) {
          min-width: 200px;
        }
      }
      /* Table body, odd rows */
      tr.Table__tbody-tr-odd {
        td {
          background-color: #f0f5fa;
        }
        /* First item */
        td:first-child {
          color: white;
          background-color: $teal;
        }
      }
      /* Dont display special table row on desktop (only for mobile) */
      tr.Table__tbody-tr-mobile-row {
        display: none;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .compare-school {
    .Table {
      thead {
        th:nth-child(3) {
          border-right: none;
        }
        th:first-child {
          display: none;
        }
      }
      tbody {
        tr.Table__tbody-tr-mobile-row {
          display: table-row;
          background-color: $teal;
          color: white;
          td {
            border-right: none;
          }
        }
        td {
          min-width: auto !important;
          width: 50%;

        }
        td:nth-child(3) {
          border-right: none;
        }
        td:first-child {
          display: none;
        }
      }
    }
  }
}

.compare-school {
  .compare-school__legal {
    color: white;
    text-align: center;
    margin-top: 40px;
    font-weight: 300;
  }
}

@include media-breakpoint-down(md) {
  .compare-school {
    tbody {
      tr {
        td {
          border-left: none;
        }
      }
    }
  }
}

.compare-school {
  .compare-school__descriptions {
    position: relative;
  }
}

.compare-school {
  .compare-school__vs-symbol {
    position: absolute;
    left: calc(100% - 35px);
    top: calc(50% - 35px);
    background-color: $orange;
    color: white;
    border-radius: 50%;
    font-size: 1.5rem;
    padding: 17px 20px;
    z-index: 1;
  }
}
@include media-breakpoint-down(sm) {
  .compare-school {
    .compare-school__vs-symbol {
      left: calc(50% - 35px);
      top: calc(100% - 35px);
    }
  }
}

.compare-school {
  .compare-school__description {
    position: relative;
  }
}

.compare-school {
  .compare-school__description {
    .compare-school__description-inner {
      max-width: 600px;
      float: left;
      padding-left: 50px;
      padding-bottom: 50px;
    }
  }
}

.compare-school {
  .compare-school__description:first-child {
    .compare-school__description-inner {
      float: right;
      padding-right: 50px;
    }
  }
}

@include media-breakpoint-down(sm) {
  .compare-school {
    .compare-school__description {
      .compare-school__description-inner {
        padding-left: 20px;
        padding-right: 20px;

      }
    }
  }

  .compare-school {
    .compare-school__description:first-child {
      .compare-school__description-inner {
        float: left;
        max-width: 800px;
      }
    }
  }

  .compare-school {
    .compare-school__description:nth-child(2) {
      .compare-school__description-inner {
        padding-top: 50px;
      }
    }
  }
}

.compare-school {
  .compare-school__description {
    .compare-school__image-container {
      margin-top: 30px;
      margin-bottom: 0px;
      height: 90px;
    }
  }
}

.compare-school {
  .compare-school__description {
    .Image {
      margin: 0 auto;
      padding-bottom: 30px;
    }
  }
}

.compare-school {
  .compare-school__description {
    .Markdown {
      line-height: 1.8;
    }
  }
}
</style>
