<script>
// Components
// DIY
import DiyBody from "@core/components/diy/body.vue";
import DiySpace from "@core/components/diy/space.vue";

// Prefab
import SpaceCapture from "~/components/prefab/space/capture/whitepaper.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceExcerpt from "@core/components/prefab/space/content/excerpt.vue";

// Libraries
import store from "store";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyBody,
        DiySpace,

        SpaceCapture
    },

    computed: {
        baseConfig() {
            return {
                body: {
                    content: this.$store.state.page.content.body.rendered,
                    id: this.id + "-body",
                    slot: "body-header"
                },

                capture: {
                    config: {
                        form: {
                            listId: 38697
                        }
                    },
                    id: this.id + "-capture",
                    slot: "after"
                },

                excerpt: {
                    content: this.$store.state.page.content.excerpt.rendered,
                    id: this.id + "-excerpt",
                    slot: "body-header"
                },

                space: {
                    id: this.id,
                    wrapperExtensionClasses: "pb-0 pt-3"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    data() {
        return {
            show: false
        };
    },

    mixins: [prefab],

    mounted() {
        let signedUp = store.get("whitepaper-" + this.id);

        if (signedUp) {
            this.show = true;
        }

        this.$nuxt.$on(
            String(this.computedConfig.capture.config.form.listId),
            () => {
                this.show = true;
            }
        );
    },

    props: {
        id: {
            default() {
                return this.$store.state.page.content.post_name;
            },
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyBody v-bind="computedConfig.excerpt" v-if="!show" />
        <SpaceCapture v-bind="computedConfig.capture" v-if="!show" />
        <DiyBody v-bind="computedConfig.body" v-if="show" />
    </DiySpace>
</template>
