<script>
import DiyImage from "@core/components/diy/image.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import get from "lodash/get";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import subscribeApi from "@core/assets/js/services/iterable/subscribe";

export default {
    components: {
        DiyImage,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                space: {
                    id: "trial",
                    show: false,
                    wrapperExtensionClasses: "bg-dark py-3 text-white"
                }
            };
        }
    },

    data() {
        return {
            error: false,
            model: {
                listId: Number(this.listId),
                subscribers: [
                    {
                        dataFields: {
                            firstName: null,
                            trialPhoneNumber: null
                        },
                        email: null
                    }
                ]
            }
        };
    },

    methods: {
        isInvalid(input, key = null) {
            if (this.error == true) {
                if (
                    key == "trialPhoneNumber" &&
                    !String(input).match(
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                    )
                ) {
                    return true;
                }

                if (!input) {
                    return true;
                }
            }
        },

        async subscribe() {
            this.error = false;

            if (
                !this.model.subscribers[0].email ||
                (!this.model.subscribers[0].dataFields.trialPhoneNumber ||
                    !String(
                        this.model.subscribers[0].dataFields.trialPhoneNumber
                    ).match(
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                    )) ||
                !this.model.subscribers[0].dataFields.firstName
            ) {
                this.error = true;

                return false;
            } else {
                await subscribeApi(this.model);

                window.location.href =
                    "https://app.aceable.com/user/signup?username=" +
                    this.model.subscribers[0].email +
                    "&firstname=" +
                    this.model.subscribers[0].dataFields.firstName +
                    "&courseId=KJM46aCyjw&app=RE&&title=Become%20A%20Real%20Estate%20Agent&subtitle=Get%20started%20with%20a%20free%205%20day%20trial&buttonCta=Start";
            }
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.trial",
            type: String
        },

        listId: {
            default: 129807,
            type: [Number, String]
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <div class="row" slot="body">
            <div class="col-md-2 col-12 my-auto p-3">
                <DiyImage src="/uploads/sites/3/2018/07/5daytrial.png" />
            </div>
            <div class="col-md-7 col-12 p-3">
                <h3 class="h3">Not sure? Try it FREE for 5 days!</h3>
                <p class="font-size-lg">With no credit card required, getting your license has never been easier!</p>
                <p class="font-size-sm">Our courses aren't just designed to help you pass a test, but are developed by education and real estate experts to help you succeed in your new career. We want to show you that we are the best real estate school in Texas. Get started for free to see for yourself.</p>
            </div>
            <div class="col-md-3 col-12 p-3">
                <div class="form-group">
                    <input class="form-control" :class="isInvalid(model.subscribers[0].dataFields.firstName) ? 'is-invalid' : null" placeholder="First Name*" type="text" v-model="model.subscribers[0].dataFields.firstName">
                    <div class="invalid-feedback" v-if="isInvalid(model.subscribers[0].dataFields.firstName)">
                        First name is required
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" :class="isInvalid(model.subscribers[0].email) ? 'is-invalid' : null"placeholder="Email Address*" type="email" v-model="model.subscribers[0].email">
                    <div class="invalid-feedback" v-if="isInvalid(model.subscribers[0].email)">
                        Email address is required
                    </div>
                </div>
                <div class="form-group">
                    <input class="form-control" :class="isInvalid(model.subscribers[0].dataFields.trialPhoneNumber, 'trialPhoneNumber') ? 'is-invalid' : null" placeholder="Phone Number*" type="text" v-model="model.subscribers[0].dataFields.trialPhoneNumber">
                    <div class="invalid-feedback" v-if="isInvalid(model.subscribers[0].dataFields.trialPhoneNumber, 'trialPhoneNumber')">
                        Phone number is required
                    </div>
                </div>
                <a class="btn btn-block btn-convert" @click.prevent="subscribe()" href="#">Get My 5 Day Trial</a>
            </div>
        </div>
    </DiySpace>
</template>
