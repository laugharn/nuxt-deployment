<script>
// Components
// Core Prefab
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";

// RE Prefab
import Structure from "~/components/prefab/structure/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import SpaceTestimonial from "~/components/prefab/space/testimonial/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceContent,
        SpaceHero,
        SpaceTrustpilot,
        SpaceTestimonial,
        Structure,
    }
};
</script>

<template>
    <Structure>
        <SpaceHero />
        <SpaceBreadcrumbs />
        <SpaceTestimonial />
        <SpaceContent />
        <SpaceTrustpilot />
    </Structure>
</template>
