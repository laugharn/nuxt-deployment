<script>
export default {
    render: async function(h) {
        let modifier, template, type;

        [type, modifier] = (this.$store.state.page.template !== null
            ? this.$store.state.page.template
            : "page--checkout-default"
        ).split("--");

        template = () =>
            import("~/templates/" + type + "/" + modifier + ".vue");

        return h(template);
    }
};
</script>
