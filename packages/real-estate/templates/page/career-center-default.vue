<script>
// Components
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCardCollectionPosts from "~/components/prefab/space/card-collection/content/post.vue";
import SpaceCardCollectionWhitepapers from "~/components/prefab/space/card-collection/content/whitepaper.vue";
import SpaceCareers from "~/components/custom/careers/careers.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceHero from "~/components/prefab/space/hero/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCardCollectionPosts,
        SpaceCardCollectionWhitepapers,
        SpaceCareers,
        SpaceContent,
        SpaceHero,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceBreadcrumbs />
        <SpaceHero />
        <SpaceContent />
        <SpaceCareers />
        <SpaceCardCollectionPosts
            :config="{
                link: {
                    content: 'See More',
                    href: '/blog/',
                    linkExtensionClasses: 'btn btn-outline-primary mt-3',
                    show: true
                },
                simplePagination: {
                    show: false
                },
                title: {
                    content: 'The latest from our blog'
                }
            }"
            config-key="spaces.posts"
            id="posts"
            :query="{
                post_type: 'post',
                posts_per_page: 3
            }"
        />
        <SpaceCardCollectionWhitepapers
            :config="{
                link: {
                    content: 'See More',
                    href: '/whitepapers/',
                    linkExtensionClasses: 'btn btn-outline-primary mt-3',
                    show: true
                },
                simplePagination: {
                    show: false
                },
                space: {
                    wrapperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    content: 'Real estate whitepapers and research'
                }
            }"
            config-key="spaces.whitepapers"
            id="whitepapers"
            :query="{
                post_type: 'whitepaper',
                posts_per_page: 3
            }"
        />
    </Structure>
</template>
