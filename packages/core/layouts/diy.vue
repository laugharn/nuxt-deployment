<script>
export default {
    mounted() {
        this.$store.commit("mutateUpdatedAt", new Date());
    }
};
</script>

<template>
    <div><nuxt /></div>
</template>
