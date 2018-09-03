<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutImageList from "~/components/prefab/space/callout/image-list.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import SpaceBundleCardCollection from "~/components/prefab/space/card-collection/product/bundle.vue";
import SpaceProductCardCollection from "~/components/prefab/space/card-collection/product/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceBundleCardCollection,
        SpaceCalloutButtons,
        SpaceCalloutImageList,
        SpaceHero,
        SpaceProductCardCollection,
        SpaceTrustpilot,
        Structure
    }
};
</script>

<template>
    <Structure>
        <SpaceCalloutImageList
            :config="{
                description: {
                    content: null
                },
                image: {
                    src: '/uploads/sites/3/2018/06/devices.png'
                },
                list: {
                    icon: {
                        icon: 'check'
                    },
                    itemsBeforeExtensionClasses: 'mb-auto mr-2 mt-1',
                    itemsItemExtensionClasses: 'font-size-lg mb-2',
                    itemsShowBefore: true,
                    unstyled: true
                },
                space: {
                    wrapperExtensionClasses: 'bg-brand-to-success py-3 text-white'
                },
                title: {
                    type: 'h1'
                }
            }"
            config-key="spaces.hero"
            id="hero"
        />

        <SpaceBreadcrumbs />

        <SpaceBundleCardCollection
            :config="{
                title: {
                    content: 'Continuing education course bundles'
                }
            }"
            config-key="spaces.continuing_education_bundles"
            id="continuing-education-bundles"
            :query="{
                post_type: 'product',
                product_line: 'continuing-education',
                product_type: 'bundle',
                state: 'texas'
            }"
        />

        <SpaceTrustpilot />

        <SpaceProductCardCollection
            :config="{
                title: {
                    content: 'Continuing education individual courses'
                }
            }"
            config-key="spaces.continuing_education_singles"
            id="continuing-education-singles"
            :query="{
                post_type: 'product',
                product_line: 'continuing-education',
                product_type: 'single',
                state: 'texas'
            }"
        />

        <SpaceCalloutButtons
            :config="{
                buttons: {
                    buttonExtensionClasses: 'btn-light'
                },
                space: {
                    wrapperExtensionClasses: 'bg-brand-to-success py-3 text-white'
                }
            }"
            config-key="spaces.help"
            id="help"
        />
    </Structure>
</template>
