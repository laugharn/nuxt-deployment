<script>
// Components
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutImage from "~/components/prefab/space/callout/image.vue";
import SpaceCardCollection from "~/components/prefab/space/card-collection/content/post.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCalloutImage,
        SpaceCardCollection,
        SpaceHero,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceHero config-key="spaces.hero" />

        <SpaceBreadcrumbs
            :config="{
                space: {
                    wrapperExtensionClasses: 'bg-light py-3'
                }
            }"
        />

        <SpaceCardCollection
            config-key="spaces.posts"
            id="space-posts"
            :query="{
                paged: $route.query.page,
                post_type: 'post'
            }"
        />

        <SpaceCalloutImage
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-dark'
                },
                space: {
                    wrapperExtensionClasses: 'bg-brand py-3 text-white'
                }
            }"
            config-key="spaces.help"
            id="space-help"
        />
    </Structure>
</template>
