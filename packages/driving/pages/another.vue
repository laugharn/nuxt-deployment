<script>
import ultra from "@core/assets/js/services/ultra/query";

export default {
    data() {
        return {
            products: null
        };
    },

    async mounted() {
        this.products = await ultra({
            post_type: "product",
            posts_per_page: -1
        });
    }
};
</script>

<template>
    <div>
        <div>Imagine a navbar</div>
        <div>{{ products }}</div>
        <div>Imagine a footer</div>
    </div>
</template>
