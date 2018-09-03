<script>
// Components
// DIY
import DiyModal from "@core/components/diy/modal.vue";
import DiyImage from "@core/components/diy/image.vue";

// Prefabs
import IntentForm from "~/components/prefab/form/iterable/intent.vue";

// Libraries
import loadjs from "loadjs";
import store from "store";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyImage,
        DiyModal,
        IntentForm
    },

    computed: {
        defaultConfig() {
            return {
                campaign: this.campaign,
                modal: {
                    confirmationCallback: async () => {
                        await this.$store.dispatch(
                            "cart/resolveConflict",
                            true
                        );
                    },
                    content: `### Where are you going?!\nWe're going to throw a headline and a form and hopefully you choose to fill it out before you go.`,
                    dismissalCallback: () => {
                        // store.set(
                        //     "dismissed-" + this.computedConfig.campaign,
                        //     true
                        // );
                        //
                        // this.toggle();

                        this.dismiss();
                    },
                    showFooter: false,
                    showHeader: false
                }
            };
        }
    },

    data() {
        return {
            loading: true,
            show: false,
            formSubmitted: false
        };
    },

    mixins: [prefab],

    methods: {
        dismiss() {
            store.set("dismissed-" + this.computedConfig.campaign, true);

            this.toggle();
        },

        toggle() {
            this.show = !this.show;
        },

        successMessage() {
            this.formSubmitted = true;
        }
    },

    async mounted() {
        let dismissal = store.get("dismissed-" + this.computedConfig.campaign);

        if (!dismissal) {
            if (!loadjs.isDefined("exit")) {
                loadjs(
                    [
                        "https://cdnjs.cloudflare.com/ajax/libs/gliojs/0.0.7/glio.min.js"
                    ],
                    "exit"
                );

                loadjs.ready("exit", () => {
                    glio.init([
                        "top",
                        () => {
                            this.toggle();
                        }
                    ]);
                });
            }
        }

        this.loading = false;
    },

    props: {
        campaign: {
            default: "exit-intent",
            type: String
        },

        configKey: {
            default: "modals.exit",
            type: String
        },

        listId: {
            default: 33954,
            type: Number
        }
    }
};
</script>

<template>
  <DiyModal content-extension-classes="bg-primary text-white text-center" :show="show && !loading" v-bind="computedConfig.modal" dialog-extension-classes="modal-dialog-centered">
    <div slot="body">
        <div class="d-flex justify-content-end" @click.prevent="dismiss()">
            <a class="h4 text-white" href="#">
                <i class="fa fa-times"></i>
            </a>
        </div>
      <div class="success" v-show="formSubmitted">
        <h2>Get excited!</h2>
        <h3 class="font-weight-normal">Six Figure Secrets is headed to your inbox!</h3>
      </div>
      <div class="container" v-show="!formSubmitted">
        <div class="row">
          <div class="col">
            <h3 class="text-centered">Six Figure Secrets </h3>
            <h4 class="text-centered font-weight-normal">Guide: How to Become Your Own Boss and Make Uncapped Commission</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-sm align-items-center">
            <DiyImage src="/uploads/real-estate/exit-intent-no-shadow.png" height="240px" image-extension-classes="mx-auto pl-4" />
          </div>
          <div class="col-sm align-items-top d-flex">
            <IntentForm :listId="92256" cta="Get the Free 4-Part Guide" v-on:formSubmitted="successMessage()"/>
          </div>
        </div>
      </div>
    </div>
  </DiyModal>
</template>
