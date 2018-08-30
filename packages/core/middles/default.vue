<script>
export default {
  render(h) {
    let modifier, template, type;

    [type, modifier] = (this.$store.state.page.template !== null
      ? this.$store.state.page.template
      : "error--default"
    ).split("--");

    template = () => import("~/templates/" + type + "/" + modifier + ".vue");

    return h(template);
  }
};
</script>
