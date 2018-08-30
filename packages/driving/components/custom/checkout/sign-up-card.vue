<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCard from "@core/components/diy/card.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";

// Libraries
import clone from "lodash/clone";
import get from "lodash/get";
import { mapGetters } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import subscribeApi from "@core/assets/js/services/iterable/subscribe";

export default {
    components: {
        DiyButton,
        DiyCard,
        DiyMarkdown
    },

    computed: {
        baseConfig() {
            return {
                button: {
                    block: true,
                    buttonExtensionClasses:
                        "btn-lg btn-pill btn-progress text-white",
                    event: async () => {
                        this.error = false;

                        let form = clone(this.form, true);
                        let emailRegExp = new RegExp(
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );

                        if (
                            form.firstName &&
                            form.username &&
                            emailRegExp.test(form.username) &&
                            ((this.isParent &&
                                form.teacherEmail &&
                                emailRegExp.test(form.teacherEmail)) ||
                                !this.isParent)
                        ) {
                            const subscriber = this.isParent
                                ? {
                                      dataFields: {
                                          studentEmail: form.username,
                                          studentFirstName: form.firstName
                                      },
                                      email: form.teacherEmail
                                  }
                                : {
                                      dataFields: {
                                          studentFirstName: form.firstName
                                      },
                                      email: form.username
                                  };

                            try {
                                if (
                                    get(this.product, "product.filter.app") ==
                                    "DE"
                                ) {
                                    let axios = await import("axios").then(
                                        response => response.default
                                    );

                                    await axios
                                        .create({
                                            baseURL:
                                                "https://api.iterable.com/api/",
                                            headers: {
                                                api_key:
                                                    "e53f5826eb1240aa94ef85b10818b0ce"
                                            }
                                        })
                                        .post("lists/subscribe", {
                                            listId: 152132,
                                            subscribers: [subscriber]
                                        });
                                } else {
                                    await subscribeApi({
                                        listId: this.isParent ? 147055 : 147056,
                                        subscribers: [subscriber]
                                    });
                                }

                                form.accountType = this.isParent
                                    ? "parent"
                                    : "student";

                                this.$nuxt.$emit("hasDoneSignUpForm", form);
                            } catch (error) {
                                // If Iterable is fucking up, keep moving
                                if (String(error).includes("50")) {
                                    form.accountType = this.isParent
                                        ? "parent"
                                        : "student";

                                    this.$nuxt.$emit("hasDoneSignUpForm", form);
                                }
                            }
                        } else {
                            this.error = true;
                        }
                    },
                    icon: "chevron-right",
                    showIconAfter: true,
                    title: "Step 2: Select Payment Type"
                },

                cardExtensionClasses: "big-radius p-4",

                title: {
                    content: `<span class="text-progress">Step 1.</span> Let's get started! Please tell us your name and email:`,
                    markdownExtensionClasses: "h4"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        },

        ...mapGetters({
            product: "cart/product"
        })
    },

    data() {
        return {
            error: false,
            form: {
                firstName: null,
                teacherEmail: null,
                username: null
            },
            isParent: false
        };
    },

    methods: {
        isInvalid(input) {
            if (this.error == true && !input) {
                return true;
            }
        },

        isInvalidEmail(input) {
            let emailRegExp = new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

            if (this.error == true && !emailRegExp.test(input)) {
                return true;
            }
        },

        toggleIsParent() {
            this.isParent = !this.isParent;
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "custom.sign-up-card"
        },

        id: {
            default: "sign-up-card"
        }
    }
};
</script>

<template>
    <DiyCard v-bind="computedConfig">
        <DiyMarkdown v-bind="computedConfig.title" />
        <div class="form-row">
            <div class="col-md-6 col-12">
                <div class="form-group">
                    <input class="form-control form-control-lg" :class="isInvalid(form.firstName) ? 'is-invalid' : null" placeholder="Student first name" type="text" v-model="form.firstName" />
                    <div class="invalid-feedback" v-if="isInvalid(form.firstName)">
                        Student first name is required
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="form-group">
                    <input class="form-control form-control-lg" :class="(isInvalid(form.username) || isInvalidEmail(form.username)) ? 'is-invalid' : null" placeholder="Student email" type="email" v-model="form.username" />
                    <div class="invalid-feedback" v-if="isInvalid(form.username) || isInvalidEmail(form.username)">
                        Student email is required
                    </div>
                </div>
            </div>
            <div class="col-12 pb-3 text-right" v-if="product.product.is.parentTool">
                <a class="text-progress" @click.prevent="toggleIsParent()" href="#" v-html="isParent ? `Nevermind, I'm a Student` : `Wait, I'm a parent!`"></a>
            </div>
            <div class="col-12 pb-3" v-if="isParent && product.product.is.parentTool">
                <p class="font-size-sm text-secondary">As a parent, you are purchasing a course for your student, whose email you provided in the field above. If you'd like, you may enter your own email below to track your student's progress.</p>

                <div class="form-group">
                    <input class="form-control form-control-lg" :class="(isInvalid(form.teacherEmail) || isInvalidEmail(form.teacherEmail)) ? 'is-invalid' : null" placeholder="Parent (your) email" type="email" v-model="form.teacherEmail" />
                    <div class="invalid-feedback" v-if="isInvalid(form.teacherEmail) || isInvalidEmail(form.teacherEmail)">
                        Parent email is required
                    </div>
                </div>
            </div>
        </div>
        <DiyButton v-bind="computedConfig.button" />
    </DiyCard>
</template>
