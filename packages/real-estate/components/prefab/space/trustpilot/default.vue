<script>
// Components
import DiySpace from "@core/components/diy/space.vue";
import DiyTrustpilot from "@core/components/diy/trustpilot.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiySpace,
        DiyTrustpilot
    },

    computed: {
        defaultConfig() {
            return {
                space: {},
                trustpilot: {
                    id: this.id + "-trustpilot",
                    slot: "body-header"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceTrustpilot",

    props: {
        configKey: {
            default: "spaces.trustpilot"
        },

        id: {
            default: "trustpilot",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace :id="identify('space')" :trigger="true" v-bind="computedConfig.space">
        <DiyTrustpilot :id="identify('trustpilot')" v-bind="computedConfig.trustpilot" />
    </DiySpace>
</template>
