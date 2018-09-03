<script>
// Components
// Prefab
import CardCollection from "../default.vue";
import Card from "~/components/prefab/card/content/post.vue";

// Libraries
import merge from "lodash/merge";

// Services
import query from "@core/assets/js/services/ultra/query";

export default {
    components: {
        Card
    },

    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                simplePagination: {
                    show: true
                }
            });
        }
    },

    extends: CardCollection,

    methods: {
        async cardQuery(queryObj) {
            this.cards = await query(queryObj).then(
                async response => response.posts
            );
        }
    }
};
</script>
