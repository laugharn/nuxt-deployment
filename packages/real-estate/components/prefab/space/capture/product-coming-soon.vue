<script>
// Components
import Capture from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                title: {
                    content: `This course is coming soon. Sign up to be notified when it launches!`
                }
            });
        }
    },

    extends: Capture
};
</script>
