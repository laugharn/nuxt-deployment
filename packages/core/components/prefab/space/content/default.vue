<script>
// Components
// DIY
import DiyBody from "../../../diy/body.vue";
import DiySpace from "../../../diy/space.vue";

// Mixins
import prefab from "../../../mixins/prefab";

// Libraries
import get from "lodash/get";

export default {
    components: {
        DiyBody,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                body: {
                    content: get(
                        this.$store.state.page.content,
                        "body.rendered",
                        null
                    ),
                    id: this.id + "-body",
                    slot: "body-header"
                },

                space: {
                    id: this.id
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.content",
            type: String
        },

        id: {
            default: "content",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyBody v-bind="computedConfig.body" />
    </DiySpace>
</template>
