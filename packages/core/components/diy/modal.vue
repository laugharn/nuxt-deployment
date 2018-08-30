<script>
// Components
import DiyButton from "./button.vue";

// Directives
import { directive as onClickaway } from "vue-clickaway";

// Libraries
import merge from "lodash/merge";

// Mixins
import diy from "../mixins/diy";

export default {
    components: {
        DiyButton
    },

    computed: {
        computedConfirmationButton() {
            return merge(
                {},
                {
                    buttonExtensionClasses: this
                        .confirmationButtonExtensionClasses,
                    event: this.confirm,
                    title: this.confirmationButtonTitle
                },
                this.confirmationButton
            );
        },

        computedDismissalButton() {
            return merge(
                {},
                {
                    buttonExtensionClasses: this
                        .dismissalButtonExtensionClasses,
                    event: this.dismiss,
                    title: this.dismissalButtonTitle
                },
                this.dismissalButton
            );
        },

        computedModalClasses() {
            return [
                this.modalClasses,
                this.modalExtensionClasses,
                this.show ? "show-modal" : null
            ];
        }
    },

    directives: {
        onClickaway
    },

    methods: {
        async confirm() {
            await this.confirmationCallback();
        },

        async dismiss() {
            await this.dismissalCallback();
        }
    },

    mixins: [diy],

    props: {
        bodyClasses: {
            default: "modal-body",
            type: String
        },

        bodyExtensionClasses: {
            default: null,
            type: String
        },

        confirmationButton: {
            default: null,
            type: Object
        },

        confirmationButtonExtensionClasses: {
            default: "btn-convert text-white",
            type: String
        },

        confirmationButtonTitle: {
            default: "Confirm",
            type: String
        },

        confirmationCallback: {
            default: null,
            type: Function
        },

        content: {
            default: "Hello **world**",
            type: String
        },

        contentClasses: {
            default: "modal-content",
            type: String
        },

        contentExtensionClasses: {
            default: null,
            type: String
        },

        dialogClasses: {
            default: "modal-dialog",
            type: String
        },

        dialogExtensionClasses: {
            default: "modal-dialog-centered",
            type: String
        },

        dismissalButton: {
            default: null,
            type: Object
        },

        dismissalButtonExtensionClasses: {
            default: null,
            type: String
        },

        dismissalButtonTitle: {
            default: "Cancel",
            type: String
        },

        dismissalCallback: {
            default: null,
            type: Function
        },

        footerClasses: {
            default: "modal-footer",
            type: String
        },

        footerExtensionClasses: {
            default: null,
            type: String
        },

        headerClasses: {
            default: "modal-header",
            type: String
        },

        headerExtensionClasses: {
            default: null,
            type: String
        },

        modalClasses: {
            default: "modal modal-backdrop",
            type: String
        },

        modalExtensionClasses: {
            default: null,
            type: String
        },

        show: {
            default: true,
            type: Boolean
        },

        showBody: {
            default: true,
            type: Boolean
        },

        showFooter: {
            default: true,
            type: Boolean
        },

        showHeader: {
            default: true,
            type: Boolean
        },

        title: {
            default: "Attention!",
            type: String
        },

        titleClasses: {
            default: "modal-title",
            type: String
        },

        titleExtensionClasses: {
            default: null,
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../../assets/sass/functions";
@import "../../assets/sass/variables";
@import "../../assets/sass/mixins";

.modal {
    background-color: rgba($modal-backdrop-bg, $modal-backdrop-opacity);
}

.show-modal {
    display: block;
}
</style>

<template>
    <div :class="computedModalClasses" tabindex="-1" role="dialog" v-if="show">
        <div :class="[dialogClasses, dialogExtensionClasses]" role="document">
            <div :class="[contentClasses, contentExtensionClasses]" v-on-clickaway="dismiss">
                <div :class="[headerClasses, headerExtensionClasses]" v-if="showHeader">
                    <h5 :class="[titleClasses, titleExtensionClasses]" v-html="markdown(title)"></h5>
                    <button type="button" class="close" @click.prevent="dismiss()" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div :class="[bodyClasses, bodyExtensionClasses]" v-if="showBody">
                    <slot name="body"><span v-html="markdown(content)" v-if="content"></span></slot>
                </div>
                <div :class="[footerClasses, footerExtensionClasses]" v-if="showFooter">
                  <DiyButton v-bind="computedDismissalButton" />
                  <DiyButton v-bind="computedConfirmationButton" />
                </div>
            </div>
        </div>
    </div>
</template>
