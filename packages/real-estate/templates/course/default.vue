<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutYoutube from "~/components/prefab/space/callout/youtube.vue";
import SpaceCapture from "~/components/prefab/space/capture/product.vue";
import SpaceFaqs from "~/components/prefab/space/faqs/default.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceHero from "~/components/prefab/space/hero/course.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceCalloutButtons,
        SpaceCalloutYoutube,
        SpaceCapture,
        SpaceFaqs,
        SpaceFeatures,
        SpaceHero,
        SpaceTrustpilot,
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
        <SpaceBreadcrumbs />
        <SpaceHero />
        <SpaceCapture
            :config="{
                form: {
                    buttonContent: 'Add to Cart'
                },
                space: {
                    wrapperExtensionClasses: 'bg-dark py-3 text-white'
                }
            }"
        />

        <SpaceFeatures
            :config="{
                features: {
                    items: $store.state.page.content.product.features
                },
                title: {
                    content: 'Learning objectives'
                }
            }"
        />

        <SpaceCalloutYoutube
            :config="{
                description: {
                    content: $store.state.page.content.product.description
                },
                space: {
                    wrapperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    content: 'Course description'
                },
                youtube: {
                    src: 'sPEVlc9Zp_M'
                }
            }"
            config-key="spaces.course_description"
            id="course-description"
        />

        <SpaceFaqs
            :config="{
                accordion: {
                    items: $store.state.page.content.product.faqs
                }
            }"
            config-key="spaces.faqs"
            id="faqs"
            v-if="$store.state.page.content.product.faqs"
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
