<script>
// Components
import Form from "./default.vue";

// Libraries
import store from "store";

export default {
    data() {
        return {
            model: {
                listId: Number(this.listId),
                subscribers: [
                    {
                        dataFields: {
                            companyName: null,
                            firstName: null
                        },
                        email: null
                    }
                ]
            }
        };
    },

    extends: Form,

    methods: {
        async whitepaperSubscribe() {
            await this.subscribe();

            store.set(
                "whitepaper-" + this.$store.state.page.content.post_name,
                true
            );

            // Emit the name for whitepaper subscribing
            this.$nuxt.$emit(this.$store.state.page.content.post_name);
        }
    }
};
</script>

<template>
    <div class="form-row">
        <div class="col-md-3">
            <input class="form-control" placeholder="Email Address" type="email" v-model="model.subscribers[0].email">
        </div>
        <div class="col-md-3">
            <input class="form-control" placeholder="First Name" type="text" v-model="model.subscribers[0].dataFields.firstName">
        </div>
        <div class="col-md-3">
            <input class="form-control" placeholder="Company Name" type="text" v-model="model.subscribers[0].dataFields.companyName">
        </div>
        <div class="col-md-3">
            <a class="btn btn-block btn-convert" @click.prevent="whitepaperSubscribe()" href="#">Download My Guide</a>
        </div>
    </div>
</template>
