<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";
import SpaceContent from "~/components/prefab/space/content/whitepaper.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceContent,
        SpaceHero,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceHero />
        <SpaceBreadcrumbs />
        <SpaceContent />
    </Structure>
</template>
