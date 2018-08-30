<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCard from "@core/components/diy/card.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

// Libraries
import get from "lodash/get";
import { mapState } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import passwordResetApi from "@core/assets/js/services/aceable/passwordReset";

export default {
    components: {
        DiyButton,
        DiyCard,
        DiyMarkdown
    },

    computed: {
        appStoreLink() {
            return "https://itunes.apple.com/us/developer/aceable-inc./id597625681";
        },

        baseConfig() {
            return {
                cardExtensionClasses: "big-radius p-4"
            };
        },

        defaultConfig() {
            return this.baseConfig;
        },

        googlePlayLink() {
            return "https://play.google.com/store/apps/developer?id=Aceable,+Inc.";
        },

        // Return the appropriate reset code based on the type of account. TODO: make a user getter
        resetCode() {
            if (get(this.receipt, "isTeacher")) {
                return get(this.$store.state.user.teacher, "resetCode", "");
            }

            return get(this.$store.state.user.account, "resetCode", "");
        },

        // Return the appropriate username based on the type of account. TODO: make a user getter
        username() {
            if (get(this.receipt, "isTeacher")) {
                return get(this.$store.state.user.teacher, "username");
            }

            return get(this.$store.state.user.account, "username");
        },

        webAppLink() {
            return process.env.ACEABLE_WEB_APP;
        },

        ...mapState({
            receipt: state => state.checkout.receipt,
            user: state => state.user.account
        })
    },

    data() {
        return {
            password: null,
            passwordError: null
        };
    },

    methods: {
        // Reset the user's password
        async resetPassword() {
            let obj = {
                password: this.password,
                code: this.resetCode,
                username: this.username
            };

            await passwordResetApi(obj)
                .then(response => {
                    if (this.receipt.isTeacher) {
                        this.$store.commit("user/mutateTeacher", response);
                    } else {
                        this.$store.commit("user/mutateAccount", response);
                    }

                    this.passwordError = null;
                })
                .catch(error => {
                    this.passwordError =
                        error.response.data.errorList[0].message;
                });
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "custom.reset"
        },

        id: {
            default: "reset"
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig">
        <DiyMarkdown content="Thank you for purchasing our course!" markdown-extension-classes="h4" />

        <div class="alert alert-danger mb-3" v-html="passwordError" v-if="passwordError"></div>

        <div v-if="get(receipt, 'isTeacher')">
            <p>We've emailed your student, {{ user.firstName }} at {{ user.username }} instructions for setting their password. To get started, they will need to open the email and click the link provided.</p>
        </div>

        <div v-if="resetCode !== ''">
            <p>Before you get started, we need to set the password for your account. Please enter your new password below.</p>

            <div class="form-row">
                <div class="col-12">
                    <input class="form-control form-control-lg" placeholder="Password" type="password" v-model="password">
                    <p class="font-size-sm form-text text-secondary">Your password must be at least 6 characters long</p>
                </div>
                <div class="col-12">
                    <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="resetPassword()" icon="chevron-right" :show-icon-after="true" title="Set Password" />
                </div>
            </div>
        </div>

        <DiyMarkdown content="You're all set! So what's next?" markdown-extension-classes="font-size-lg font-weight-bold" :marked="true" v-if="resetCode == ''" />

        <p v-if="get(receipt, 'isTeacher') && resetCode == ''">If your student has opened their email, they should already be on their way to setting their password and starting the course. As the parent, you get access to our full suite of Parent Tools, which let you track your student's progress and test results!</p>

        <p v-if="!get(receipt, 'isTeacher') && resetCode == ''">You are ready to take the course, of course! Once in, you'll be asked to complete your student profile and then you can start taking Chapter 1.</p>

        <p v-if="resetCode == ''">If you have an Apple (iPad and iPhone) or Android device, be sure to download our app for the best experience possible!</p>

        <div class="form-row" v-if="resetCode == ''">
            <div class="col-md col-12 pb-2">
                <DiyButton :block="true" button-extension-classes="btn-lg btn-pill btn-progress" @click.prevent="$store.dispatch('page/goTo', webAppLink)" title="Web Course" />
            </div>
            <div class="col">
                <DiyButton :block="true" button-extension-classes="btn-lg btn-link" @click.prevent="$store.dispatch('page/goTo', appStoreLink)" icon="apple" :show-icon-before="true" title="App Store" />
            </div>
            <div class="col">
                <DiyButton :block="true" button-extension-classes="btn-lg btn-link" @click.prevent="$store.dispatch('page/goTo', googlePlayLink)" icon="google-play" :show-icon-before="true" title="Google Play" />
            </div>
        </div>
    </DiyCard>
</template>
