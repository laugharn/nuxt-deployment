<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";

// Prefab
import Callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

// Services
import subscribeApi from "@core/assets/js/services/iterable/subscribe";

export default {
  components: {
      DiyList
  },
    computed: {
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
                        slot: this.descriptionSlot,

                    },
                    this.description
                ),
                //Default form for email signup
                form: {
                  listId: this.formListId
                },

                space: merge(
                    {
                        asideExtensionClasses: this.spaceAsideExtensionClasses,
                        id: this.id + "-space",
                        mainExtensionClasses: this.spaceMainExtensionClasses,
                        show: this.spaceShow,
                        wrapperExtensionClasses: this
                            .spaceWrapperExtensionClasses,
                        wrapperClasses: `intake bg-dark text-white py-6`,
                        showBackgroundImage: true,
                        backgroundImage: `/manual/driving/courses/intake-bg.png`,
                        asideExtensionClasses: this.spaceAsideExtensionClasses,
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
                        type: this.titleType,
                        marked: true
                    },
                    this.title
                )
            };
        },

        defaultConfig() {
            return this.baseConfig;
        },

        showError() {
          return this.submitted && this.invalid;
        },

        showSuccess() {
          return this.submitted && !this.invalid;
        }
    },

    data() {
    return {
        submitted: false,
        invalid: false,
        errorMessage: "",
        model: {
            listId: Number(this.formListId),
            subscribers: [
                {
                    dataFields: {
                        studentFirstName: null,
                        studentEmail: null,
                    },
                    email: null
                }
            ]
        }
    };
},


    extends: Callout,

    methods: {
      async subscribe() {
          this.submitted = true;
          const email = this.model.subscribers[0].email;
          const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if(!email || email == '') {
            this.invalid = true;
            this.errorMessage = "Please enter a parent email address.";
          } else if(emailRegEx.test(email)) {
            await subscribeApi(this.model).catch(error => {
            console.log(error);
          }).then(response => {
            this.invalid = false;
          });
        } else {
          this.invalid = true;
          this.errorMessage = "Please enter a valid parent email address.";
        }
      }
    },

    props: {
      titleContent: {
          default: "Need to ask mom or dad?",
          type: String
      },

      list: {
        default: {},
        type: Object,
      },

      descriptionContent: {
          default: "We can send Mom and Dad all the info they need for you to get started with Aceable! Enter your name and email, and a parent’s email, and we’ll shoot them a message with more details.",
          type: String
      },
      formListId: {
        default: 91897,
        type: Number
    }
  }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
      <DiyHeading v-bind="computedConfig.title" />
      <DiyMarkdown v-bind="computedConfig.description" />
      <DiyList v-bind="list" />
        <div slot="aside">
          <div class="intake bg-white text-dark p-4 rounded">
            <div class="alert alert-danger" role="alert" v-if="showError">{{ errorMessage }}</div>
            <div class="alert alert-success" role="alert" v-if="showSuccess"><h2>Thanks!</h2> <p>We'll send your parents all the info about Aceable drivers ed.</p></div>
            <form name="iterable_optin" class="px-4" v-if="!showSuccess">
                <p>Fill this out and we'll send your parents all the info about Aceable drivers ed</p>
                <div class="form-group">
                   <label for="firstName">First Name</label>
                    <input class="form-control" name="firstName" placeholder="First Name" required type="text"  v-model="model.subscribers[0].dataFields.studentFirstName">
                </div>
                <div class="form-group">
                   <label for="studentEmail">Your Email</label>
                    <input class="form-control" name="studentEmail" placeholder="Your Email" type="email" v-model="model.subscribers[0].dataFields.studentEmail">
                </div>
                <div class="form-group">
                   <label for="email">Your Parent's Email</label>
                    <input class="form-control" name="email" placeholder="Your Parent's Email" required type="email" v-model="model.subscribers[0].email">
                </div>
                <div class="form-group text-center">
                <input class="btn btn-notice btn-lg btn-pill font-weight-bold" name="go" type="submit" @click.prevent="subscribe()" value="Send">
              </div>
            </form>
        </div>
      </div>
    </DiySpace>
</template>
