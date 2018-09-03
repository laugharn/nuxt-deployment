<script>
// Components
import hero from "./default.vue";

// Libraries
import deepGet from "@core/assets/js/utils/deepGet";
import merge from "lodash/merge";

export default {
    computed: {
        defaultConfig() {
            return merge(this.baseConfig, {
                description: {
                    content: deepGet(
                        this.$store.state.page.content,
                        "spaces.hero.description.content",
                        "product.description",
                        "product.card.description",
                        "seo.description"
                    )
                },

                space: {
                    backgroundImage:
                        deepGet(
                            this.$store.state.page.content,
                            "image",
                            "product.image"
                        ) ||
                        "/uploads/content/k7JdmEL3jlLJVzzaBlCzdDLx9XNl6C9u.jpg"
                }
            });
        }
    },

    extends: hero
};
</script>
