<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCapture from "~/components/prefab/space/capture/guide.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import SpaceProductCardCollection from "~/components/prefab/space/card-collection/product/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCalloutButtons,
        SpaceCapture,
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

        <SpaceCapture
            :config="{
                description: {
                    content: `AceableAgent is coming to New York, and you'll never take continuing education the same way again!`
                },
                form: {
                    buttonText: 'Sign Up',
                    listId: 128035
                },
                success: {
                    content: 'Thanks for signing up, watch your inbox!'
                },
                title: {
                    content: 'Be the first to know when we go live'
                }
            }"
            config-key="spaces.capture"
            id="capture"
        />

        <SpaceProductCardCollection
            :config="{
                card: {
                    canLink: false,
                    showButton: false,
                    usePlaceholder: true
                },
                title: {
                    content: 'Continuing education bundles'
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
                card: {
                    canLink: false,
                    showButton: false,
                    usePlaceholder: true
                },
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
