<script>
import hello from "@core/assets/js/hello";

export default {
    computed: {
        hello() {
            return hello(this.name) + ", this is on " + process.env.ENV_FILE;
        }
    },

    data() {
        return {
            name: "Kevin"
        };
    }
};
</script>

<template>
    <div v-html="hello"></div>
</template>
