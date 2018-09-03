<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import SpaceBundleCardCollection from "~/components/prefab/space/card-collection/product/bundle.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceBundleCardCollection,
        SpaceHero,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceHero />
        <SpaceBreadcrumbs />

        <SpaceBundleCardCollection
            :config="{
                title: {
                    content: 'Professional development courses'
                }
            }"
            config-key="spaces.training_singles"
            id="training-singles"
            :query="{
                post_type: 'product',
                product_line: 'training',
                product_type: 'single'
            }"
        />
    </Structure>
</template>
