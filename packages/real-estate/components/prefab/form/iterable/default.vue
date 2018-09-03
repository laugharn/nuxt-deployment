<script>
// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import subscribeApi from "@core/assets/js/services/iterable/subscribe";

export default {
    data() {
        return {
            model: {
                listId: Number(this.listId),
                subscribers: [
                    {
                        email: null
                    }
                ]
            }
        };
    },

    methods: {
        async subscribe() {
            await subscribeApi(this.model);

            this.$nuxt.$emit(String(this.listId));
        }
    },

    mixins: [prefab],

    props: {
        buttonContent: {
            default: "Subscribe",
            type: String
        },

        listId: {
            default: 33954,
            type: [Number, String]
        }
    }
};
</script>

<template>
    <div class="form-row">
        <div class="col">
            <input class="form-control" placeholder="Email Address" type="email" v-model="model.subscribers[0].email">
        </div>
        <div class="col-auto">
            <a class="btn btn-convert" @click.prevent="subscribe()" href="#">{{ buttonContent }}</a>
        </div>
    </div>
</template>
