<script>
// Components
// DIY
import DiyCollection from "@core/components/diy/collection.vue";
import DiyHeading from "@core/components/diy/heading.vue";
import DiyLink from "@core/components/diy/link.vue";
import DiySpace from "@core/components/diy/space.vue";

// Prefab
import Card from "~/components/prefab/card/default.vue";
import Pagination from "~/components/prefab/collection/button/pagination.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

// Services
import query from "@core/assets/js/services/ultra/query";

export default {
    components: {
        DiyCollection,
        DiyHeading,
        DiyLink,
        DiySpace,

        Card,
        Pagination
    },

    computed: {
        baseConfig() {
            return {
                card: {
                    canLink: this.cardCanLink,
                    showButton: true,
                    usePlaceholder: false
                },

                collection: {
                    columnExtensionClasses: "col-md-4 d-flex",
                    id: this.id + "-collection",
                    slot: "body-footer"
                },

                link: {
                    id: this.id + "-link",
                    show: false,
                    slot: "body-footer"
                },

                simplePagination: {
                    id: this.id + "-pagination",
                    show: false,
                    slot: "body-footer"
                },

                space: {
                    bodyFooterExtensionClasses: "p-3",
                    id: this.id,
                    wrapperExtensionClasses: "py-3"
                },

                title: {
                    id: this.id + "-title",
                    slot: "body-header",
                    type: "h2"
                }
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    data() {
        return {
            cards: null,
            loading: true
        };
    },

    methods: {
        async cardQuery(queryObj) {
            this.cards = await query(queryObj).then(response => response.posts);
        }
    },

    mixins: [prefab],

    async mounted() {
        await this.cardQuery(this.computedQuery);

        this.loading = false;
    },

    props: {
        configKey: {
            default: "space.card_collection",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space" v-if="!loading">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyCollection :items="cards" v-bind="computedConfig.collection">
            <Card slot-scope="item" :card-content="item" v-bind="computedConfig.card" />
        </DiyCollection>
        <DiyLink v-bind="computedConfig.link" />
        <Pagination v-bind="computedConfig.simplePagination" v-if="computedConfig.simplePagination.show" />
    </DiySpace>
</template>
