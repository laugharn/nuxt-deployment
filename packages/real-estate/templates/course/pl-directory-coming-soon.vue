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
                    content: `The best way to get your real estate license is coming to New York.`
                },
                form: {
                    buttonText: 'Sign Up',
                    listId: 128032
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
                    content: 'Pre-license individual courses'
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
