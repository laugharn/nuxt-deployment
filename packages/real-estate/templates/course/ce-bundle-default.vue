<script>
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceButton from "~/components/prefab/space/button/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutImageList from "~/components/prefab/space/callout/image-list.vue";
import SpaceCaptureGuide from "~/components/prefab/space/capture/guide.vue";
import SpaceCaptureProduct from "~/components/prefab/space/capture/product.vue";
import SpaceFaqs from "~/components/prefab/space/faqs/default.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceTestimonial from "~/components/prefab/space/testimonial/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        SpaceBreadcrumbs,
        SpaceButton,
        SpaceCalloutButtons,
        SpaceCalloutImageList,
        SpaceCaptureGuide,
        SpaceCaptureProduct,
        SpaceFaqs,
        SpaceFeatures,
        SpaceTestimonial,
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
                    show: false
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
                logo: {
                    show: false
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

        <SpaceCaptureProduct
            :config="{
                form: {
                    buttonContent: 'Start Today'
                },
                space: {
                    wrapperExtensionClasses: 'bg-dark py-3 text-white'
                }
            }"
        />

        <SpaceTestimonial />

        <SpaceFeatures
            :config="{
                features: {
                    items: $store.state.page.content.product.features
                },
                space: {
                    wrapperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    show: false
                }
            }"
        />

        <SpaceFaqs
            :config="{
                accordion: {
                    items: $store.state.page.content.product.faqs || [],
                    itemsInitiallyToggled: true
                }
            }"
        />

        <SpaceButton
            :checkout="false"
            :config="{
                form: {
                    buttonContent: 'Start Today'
                }
            }"
        />

        <SpaceCaptureGuide
            :config="{
                description: {
                    content: '73% of clients say they would hire an agent who uses video to market their property, but only 15% of agents actually use video. What are you waiting for?'
                },
                form: {
                    buttonContent: 'Get the FREE Whitepaper'
                },
                title: {
                    content: 'How to master video marketing from your phone'
                }
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
