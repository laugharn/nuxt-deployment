<script>
import Intake from "~/components/custom/intake/default.vue";
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceButton from "~/components/prefab/space/button/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutImageList from "~/components/prefab/space/callout/image-list.vue";
import SpaceCalloutYoutubeQuote from "~/components/prefab/space/callout/youtube-quote.vue";
import SpaceCaptureGuide from "~/components/prefab/space/capture/guide.vue";
import SpaceCaptureProduct from "~/components/prefab/space/capture/product.vue";
import SpaceFaqs from "~/components/prefab/space/faqs/default.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceFeaturesAccordion from "~/components/prefab/space/features/accordion.vue";
import SpaceTestimonial from "~/components/prefab/space/testimonial/default.vue";
import SpaceTrial from "~/components/custom/trial/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        Intake,
        SpaceBreadcrumbs,
        SpaceButton,
        SpaceCalloutButtons,
        SpaceCalloutImageList,
        SpaceCalloutYoutubeQuote,
        SpaceCaptureGuide,
        SpaceCaptureProduct,
        SpaceFaqs,
        SpaceFeatures,
        SpaceFeaturesAccordion,
        SpaceTestimonial,
        SpaceTrial,
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

        <SpaceCalloutImageList
            :config="{
                description: {
                    content: ''
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
                    asideExtensionClasses: 'pt-3',
                    mainExtensionClasses: 'pt-3',
                    wrapperExtensionClasses: 'bg-brand-to-success pt-3 text-white'
                },
                title: {
                    content: $store.state.page.content.product.product.content.title,
                    type: 'h1'
                }
            }"
            config-key="spaces.hero"
            id="hero"
        />

        <SpaceCaptureProduct
            :config="{
                form: {
                    buttonContent: `Get My License <small class='fa fa-chevron-right'></small>`
                },
                space: {
                    asideExtensionClasses: 'd-none',
                    wrapperExtensionClasses: 'bg-dark py-3 text-white'
                }
            }"
            id="capture-product"
        />

        <Intake
            :form-list-id="94171"
        />

        <SpaceFeatures
            :config="{
                space: {
                    wrapperExtensionClasses: 'py-3'
                }
            }"
            config-key="spaces.messaging"
        />

        <SpaceTestimonial />

        <SpaceFeatures
            :config="{
                features: {
                    items: $store.state.page.content.spaces.features.items || $store.state.page.content.product.features
                },
                space: {
                    wrapperExtensionClasses: 'py-3'
                }
            }"
            id="features"
        />

        <SpaceCaptureGuide
            id="guide"
        />

        <SpaceFeaturesAccordion
            config-key="spaces.accordion"
            :config="{
                features: {
                    items: $store.state.page.content.product.features,
                    itemsInitiallyToggled: true
                }
            }"
            id="features-accordion"
        />

        <SpaceButton />

        <SpaceTrial />

        <SpaceCalloutYoutubeQuote />

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
