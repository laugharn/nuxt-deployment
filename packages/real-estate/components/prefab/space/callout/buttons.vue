<script>
import Callout from "./default.vue";

import merge from "lodash/merge";

export default {
    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                buttons: {
                    slot: "aside"
                }
            });
        }
    },

    extends: Callout,

    props: {
        buttonsSlot: {
            default: "aside"
        }
    }
};
</script>
