<script>
export default {
    computed: {
        component() {
            if (this.$store.state.page.template !== null) {
                let [type, modifier] = this.$store.state.page.template.split(
                    "--"
                );

                return () =>
                    import("~/templates/" + type + "/" + modifier + ".vue");
            }

            return "nuxt";
        }
    }
};
</script>

<template>
    <component :is="component"></component>
</template>
