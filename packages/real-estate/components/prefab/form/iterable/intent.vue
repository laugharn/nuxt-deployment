<script>
// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import subscribeApi from "@core/assets/js/services/iterable/subscribe";

export default {
    computed: {
        showFeedback() {
            return this.error || this.subscribed;
        }
    },
    data() {
        return {
            model: {
                listId: Number(this.listId),
                subscribers: [
                    {
                        email: null,
                        firstName: null
                    }
                ]
            },
            subscribed: false,
            error: false,
            feedback: ""
        };
    },

    methods: {
        async subscribe() {
            if (this.validate(this.model.subscribers[0])) {
                try {
                    await subscribeApi(this.model);
                    this.$nuxt.$emit(this.id);
                    this.subscribed = true;
                    this.error = false;
                    this.$emit("formSubmitted", true);
                } catch (e) {
                    this.error = true;
                    this.feedback =
                        "There was a problem subcsribing this account. Please try again later.";
                    return false;
                }
            }
        },
        validate(formData) {
            //Rest feedback upon validation.
            this.feedback = "";

            //Validate Email address. Other fields optional.
            const emailInput = this.model.subscribers[0].email;

            //Reg Ex to validate email.
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            // Check for empty input
            if (emailInput === null || emailInput.length <= -1) {
                this.error = true;
                this.feedback += "Please enter your email address";
                return false;
            }

            // Validate email address
            if (!emailRegex.test(String(emailInput).toLowerCase())) {
                this.error = true;
                this.feedback += "Please enter a valid email address";
                return false;
            }

            return true;
        }
    },

    mixins: [prefab],

    props: {
        listId: {
            default: 33954,
            type: [Number, String]
        },
        cta: {
            default: "Subscribe",
            type: String
        }
    }
};
</script>

<template>
  <div class="intent-form mx-auto w-100 my-auto d-flex flex-column">
    <div class="error">
       <small class="form-text text-alert font-size-xs alert alert-danger p-1 mb-1" :class="{ show : error}" v-if="error">{{ feedback }}</small>
    </div>

  <form v-show="!subscribed" autocomplete="on" validate class="pb-4">
    <div class="form-group text-left">
      <label for="email" class="font-size-xs">Email address</label>
      <input name="email" type="email" class="form-control form-control-small" placeholder="jane.doe@email.com" required v-model="model.subscribers[0].email" autocomplete="email">
    </div>

    <a class="btn btn-convert btn-block" @click.prevent="subscribe()" href="#">{{ cta }}</a>

    </form>
  </div>
</template>
