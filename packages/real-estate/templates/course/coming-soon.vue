<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutImage from "~/components/prefab/space/callout/image.vue";
import SpaceCapture from "~/components/prefab/space/capture/product-coming-soon.vue";
import SpaceFaqs from "~/components/prefab/space/faqs/default.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCalloutImage,
        SpaceCapture,
        SpaceFaqs,
        SpaceFeatures,
        SpaceHero,
        Structure
    }
};
</script>

<template>
    <Structure
        :config="{
            nav: {
                space: {
                    sticky: false
                }
            }
        }"
    >

        <SpaceHero />
        <SpaceBreadcrumbs />
        <SpaceCapture />
        <SpaceFeatures />
        <SpaceFaqs />

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

        <SpaceCalloutImage
            config-key="spaces.app"
            id="space-app"
        />
    </Structure>
</template>
