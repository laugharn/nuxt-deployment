<script>
import DiySpace from "@core/components/diy/space.vue";

import terms from "@core/assets/js/services/ultra/terms";
import query from "@core/assets/js/services/ultra/query";

import get from "lodash/get";

import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiySpace
    },

    computed: {
        careerTerms() {
            if (this.terms && this.careers) {
                let careerTerms = [];

                this.terms.forEach(term => {
                    let careerTerm = {};
                    careerTerm.careers = [];
                    careerTerm.term = term;

                    this.careers.forEach(career => {
                        if (
                            get(career, "terms", []).filter(
                                t => t.term_id == term.term_id
                            ).length > 0
                        ) {
                            careerTerm.careers.push(career);
                        }
                    });

                    careerTerms.push(careerTerm);
                });

                return careerTerms;
            }
        }
    },

    data() {
        return {
            careers: null,
            terms: null
        };
    },

    layout: "diy",

    mixins: [prefab],

    async mounted() {
        this.careers = await query({
            post_type: "career",
            posts_per_page: -1,
            state: this.$route.params.child
        }).then(response => response.posts.filter(career => career.terms));

        this.terms = await terms({
            object_ids: this.careers.map(career => career.ID),
            taxonomy: "topic"
        }).then(response => response.terms);
    }
};
</script>

<template>
    <DiySpace wrapper-extension-classes="bg-light py-3">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-12 p-3" :key="'term-' + index" v-for="(careerTerm, index) in careerTerms" v-if="careerTerms">
                    <h3 class="h5">{{ unescape(careerTerm.term.name) }}</h3>
                    <ul>
                        <li :key="'career-' + index" v-for="(career, index) in careerTerm.careers">
                            <a @click.prevent="$store.dispatch('page/goTo', '/career-center' + career.permalink)" :href="'/career-center' + career.permalink">{{ career.post_title }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </DiySpace>
</template>
