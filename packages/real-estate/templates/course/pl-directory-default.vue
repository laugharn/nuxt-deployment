<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutYoutubeQuote from "~/components/prefab/space/callout/youtube-quote.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import SpaceProductCardCollection from "~/components/prefab/space/card-collection/product/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCalloutYoutubeQuote,
        SpaceHero,
        SpaceProductCardCollection,
        SpaceTrustpilot,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceHero />
        <SpaceBreadcrumbs />

        <SpaceProductCardCollection
            :config="{
                title: {
                    content: 'Individual pre-license courses'
                }
            }"
            config-key="spaces.pre_license_singles"
            id="pre-license-singles"
            :query="{
                post_type: 'product',
                product_line: 'pre-license',
                product_type: 'single',
                state: 'texas'
            }"
        />

        <SpaceTrustpilot />

        <SpaceProductCardCollection
            :config="{
                title: {
                    content: 'Pre-license exam prep'
                }
            }"
            config-key="spaces.pre_license_singles"
            id="pre-license-singles"
            :query="{
                post_type: 'product',
                product_line: 'pre-license',
                product_type: 'other',
                state: 'texas'
            }"
        />
    </Structure>
</template>
