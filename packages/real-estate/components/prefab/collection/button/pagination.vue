<script>
// Components
// DIY
import DiyButton from "@core/components/diy/button.vue";
import DiyCollection from "@core/components/diy/collection.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyButton,
        DiyCollection
    },

    computed: {
        computedConfig() {
            let items = [],
                nextButton,
                pageNumber,
                previousButton;

            pageNumber = this.$route.query.page;

            previousButton = {
                block: true,
                buttonExtensionClasses: "btn-outline-primary",
                columnClasses: "col-md-4",
                href:
                    this.$route.path +
                    (pageNumber
                        ? pageNumber > 1
                            ? "?page=" + (Number(pageNumber) - 1)
                            : ""
                        : ""),
                title: "Previous"
            };

            nextButton = {
                block: true,
                buttonExtensionClasses: "btn-outline-primary",
                columnClasses: "col-md-4",
                href:
                    this.$route.path +
                    "?page=" +
                    (pageNumber ? Number(pageNumber) + 1 : "2"),
                title: "Next"
            };

            if (this.$route.query.page && this.$route.query.page > 1) {
                items.push(previousButton);
            }

            items.push(nextButton);

            return {
                collection: {
                    collectionExtensionClasses: "py-3",
                    items: items
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        items: {
            default: null,
            type: Array
        },

        postsPerPage: {
            default: 12,
            type: [Number, String]
        }
    }
};
</script>

<template>
    <DiyCollection v-bind="computedConfig.collection">
        <DiyButton @click.prevent="$store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
    </DiyCollection>
</template>
