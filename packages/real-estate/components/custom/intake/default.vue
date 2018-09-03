<script>
// Components
import Form from "~/components/prefab/form/iterable/default.vue";

// Libraries
import store from "store";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Utils
import sleep from "@core/assets/js/utils/sleep";

export default {
    components: {
        Form
    },

    computed: {
        defaultConfig() {
            return {
                description: {
                    content: `Skip the classroom, but keep the back-to-school savings! Get 20% off pre-license today. Valid thru 9/3.`
                },

                form: {
                    buttonContent: this.formButtonContent,
                    id: this.id,
                    listId: this.formListId
                },

                success: {
                    content:
                        `Thanks! Use code "` +
                        this.id.toUpperCase() +
                        `" at checkout to save an additional 20% (also sent to your email)`
                },

                title: {
                    content: `Back-to-School Special! Save 20%`
                }
            };
        }
    },

    data() {
        return {
            show: false,
            subscribed: false
        };
    },

    methods: {
        dismiss() {
            store.set("dismissed-" + this.id, true);

            this.show = false;
        },

        subscribe() {
            store.set("dismissed-" + this.id, true);

            this.subscribed = true;
        }
    },

    mixins: [prefab],

    async mounted() {
        let dismissed = store.get("dismissed-" + this.id);

        if (!dismissed) {
            await sleep(this.timeout).then(() => {
                this.show = true;
            });

            this.$nuxt.$on(this.computedConfig.form.listId, async () => {
                this.subscribe();
            });
        }
    },

    props: {
        configKey: {
            default: "spaces.intake",
            type: String
        },

        formButtonContent: {
            default: "Get My Discount",
            type: String
        },

        formListId: {
            default: 75648,
            type: [Number, String]
        },

        id: {
            default: "save20",
            type: String
        },

        timeout: {
            default: 1000,
            type: [Number, String]
        }
    }
};
</script>

<style>
.viewport.above-viewport > .wrapper {
    display: block !important;
}
</style>

<template>
    <div class="viewport w-100" :id="id + '-wrapper'" v-in-viewport>
        <div class="d-none fixed-bottom wrapper" v-if="show">
            <div class="container">
                <div class="row">
                    <div class="bg-notice col-md-6 mx-auto p-3 text-white">
                        <div class="d-flex justify-content-end">
                            <a class="text-white" @click.prevent="dismiss()" href="#">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                        <span class="h4" v-html="computedConfig.title.content"></span>
                        <p class="font-size-xs" v-if="!subscribed" v-html="computedConfig.description.content"></p>
                        <p v-html="computedConfig.success.content" v-if="subscribed"></p>
                        <Form v-bind="computedConfig.form" v-if="!subscribed" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
