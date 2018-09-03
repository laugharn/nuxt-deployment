<script>
import median from "~/assets/js/services/datasette/median";

export default {
    computed: {
        computedMedian() {
            return this.median
                ? "$" +
                      Math.round(this.median)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : null;
        },

        salary() {
            return this.median
                ? "$" +
                      Math.round(
                          this.median * this.volume * (this.commission / 100)
                      )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : null;
        }
    },

    data() {
        return {
            commission: 3,
            email: null,
            median: null,
            volume: 5,
            zip: null
        };
    },

    methods: {
        async calculate() {
            if (!this.zip) {
                alert("A zip code is required");

                return false;
            }

            if (this.zip.length !== 5) {
                alert("You must use a five digit zip code");

                return false;
            }

            this.median = await median(this.zip).catch(error => {
                alert(`Uh oh, we don't have any home data for ${this.zip}`);
            });
        },

        reset() {
            this.median = null;
            this.zip = null;
        }
    }
};
</script>

<template>
    <div class="wrapper bg-brand-to-success py-3 text-white">
        <div class="container">
            <div class="row">
                <div class="col-md-8 my-auto py-3" v-if="!median">
                    <h2 class="h2">How much could YOU be making? Use our Commission Calculator to find out!</h2>
                    <p>Enter a zip code, a commission rate, and the number of commissions you'd hope to make. We'll show you how much you could make when you get your real estate license with AceableAgent!</p>
                    <p class="font-size-xs">Commission revenue shown is an average calculated from data presented by Zillow.com. The information above is not a guaranteed or suggested income or commission rate for potential or current agents in the listed zip code.</p>
                </div>
                <div class="col-md-4 my-auto py-3" v-if="!median">
                    <div class="form-group">
                        <input class="form-control" placeholder="Zip Code" v-model="zip">
                    </div>

                    <div class="form-group">
                        <div class="input-group">
                            <input class="form-control" placeholder="Commission Rate" v-model="commission">
                            <div class="input-group-append">
                                <span class="input-group-text">Commission %</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <select class="form-control" v-model="volume">
                            <option value="5">5 Commissions</option>
                            <option value="10">10 Commissions</option>
                            <option value="15">15 Commissions</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <a class="btn btn-block btn-convert" @click.prevent="calculate()" href="#">Calculate Commission</a>
                    </div>
                </div>
                <div class="col-12" v-if="median">
                    <h2 class="h1">
                        The median sale price in {{ zip }} is {{ computedMedian }}. If you had {{ volume }} commissions, you could make <span class="text-dark">{{ salary }}</span>! Why not <a class="text-notice" @click.prevent="$store.dispatch('page/goTo', '/courses/texas/pre-license/')" href="/courses/texas/pre-license/">get started</a> today?
                    </h2>
                    <a class="text-white" @click.prevent="reset()" href="#">Try a new zip code</a>
                </div>
            </div>
        </div>
    </div>
</template>
