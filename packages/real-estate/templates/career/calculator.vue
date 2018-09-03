<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCapture from "~/components/prefab/space/capture/default.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";
import SpaceMedian from "~/components/custom/space/median.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCapture,
        SpaceContent,
        SpaceHero,
        SpaceMedian,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceHero />
        <SpaceBreadcrumbs />
        <SpaceMedian />
        <SpaceContent />
    </Structure>
</template>
