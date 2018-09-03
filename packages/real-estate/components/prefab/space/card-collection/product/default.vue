<script>
// Components
// Prefab
import CardCollection from "../default.vue";
import Card from "~/components/prefab/card/product/default.vue";

// Services
import productApi from "@core/assets/js/services/aceable/products";
import query from "@core/assets/js/services/ultra/query";

export default {
    components: {
        Card
    },

    extends: CardCollection,

    methods: {
        async cardQuery(queryObj) {
            this.cards = await query(queryObj).then(async response => {
                let cards = response.posts.filter(card => {
                    return !card.hide;
                });

                let productIds = cards
                    .map(card => card._id)
                    .filter(id => (id ? true : false));

                if (productIds.length > 0) {
                    let products = await productApi(productIds);

                    cards = cards
                        .map(card => {
                            if (card.is_purchasable) {
                                card.product = products.find(
                                    product => product._id == card._id
                                );
                            }

                            return card;
                        })
                        .sort((a, b) => a.order - b.order);
                }

                return cards;
            });
        }
    }
};
</script>
