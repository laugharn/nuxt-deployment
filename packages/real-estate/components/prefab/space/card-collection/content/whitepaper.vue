<script>
// Components
// Prefab
import CardCollection from "../default.vue";
import Card from "~/components/prefab/card/content/whitepaper.vue";

// Services
import query from "@core/assets/js/services/ultra/query";

export default {
    components: {
        Card
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
