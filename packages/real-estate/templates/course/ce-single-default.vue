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
            config-key="spaces.features"
            id="features"
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
                    src: '6ESXga22vdk'
                }
            }"
            config-key="spaces.course_description"
            id="course-description"
        />

        <SpaceFaqs
            :config="{
                accordion: {
                    items: $store.state.page.content.product.faqs || [{
                            title: `Who can take AceableAgent's Real Estate Continuing Education courses?`,
                            description: `You can take our continuing education courses if you have been a licensed real estate agent for at least 2 years. If you've only been an agent for 1 year, you need to take Salesperson Annual Education (SAE) - unfortunately, we don't offer this yet. If you're a licensed real estate broker, you'll need to take our continuing education courses for brokers.`
                        },
                        {title: 'How long do I have to complete my CE courses with AceableAgent?', description: `Our courses don't expire but you'll want to finish your CE requirement by your renewal deadline.`}, {
                            title: `When will my course credits be reported to TREC?`,
                            description: `We immediately report your course credit to TREC upon course completion once your final exam has been passed.`
                    }]
                }
            }"
            config-key="spaces.faqs"
            id="faqs"
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
