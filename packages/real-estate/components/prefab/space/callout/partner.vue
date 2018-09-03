<script>
// Prefab
import Callout from "./image.vue";

// Libraries
import merge from "lodash/merge";

export default {
    computed: {
        defaultConfig() {
            return merge(this.extendConfig, {
                description: {
                    content: `AceableAgent is the fresh, new state-approved course that syncs across phone, tablet, and home computer. TREC Provider Approval #10137`
                },

                image: {
                    src: this.$store.state.page.content.image
                },

                space: {
                    asideExtensionClasses: "my-auto p-3",
                    wrapperExtensionClasses:
                        "bg-brand-to-success py-3 text-white"
                },

                title: {
                    type: "h1"
                }
            });
        }
    },

    extends: Callout,

    props: {
        configKey: {
            default: "spaces.callout_partner"
        },

        id: {
            default: "callout-partner"
        }
    }
};
</script>
