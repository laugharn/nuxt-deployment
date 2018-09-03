<script>
// Components
// Prefab
import Intake from "~/components/custom/intake/default.vue";
import SpaceBundleCardCollection from "~/components/prefab/space/card-collection/product/bundle.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceCalloutImage from "~/components/prefab/space/callout/image-app.vue";
import SpaceCalloutYoutubeListProduct from "~/components/prefab/space/callout/youtube-list-product.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceHero from "~/components/prefab/space/hero/home-house.vue";
import SpaceProductCardCollection from "~/components/prefab/space/card-collection/product/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";
import Structure from "~/components/prefab/structure/default.vue";

export default {
    components: {
        Intake,
        SpaceBundleCardCollection,
        SpaceCalloutButtons,
        SpaceCalloutImage,
        SpaceCalloutYoutubeListProduct,
        SpaceFeatures,
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

        <Intake />

        <SpaceCalloutYoutubeListProduct
            :config="{
                list: {
                    items: [{content: 'Get your license at your own pace, on any device'}, {content: '100% TREC approved - all 180 hours of content included'}, {content: 'Pass the test or your money back.'}, {content: 'Endorsed by top-producing Texas Agents - Set yourself up for a successful career in Real Estate!'}]
                },
                product_id: 'XBZyTXo24w',
                title: {
                    content: 'Ready to get your license and start a new career?'
                },
                youtube: {
                    src: 'sPEVlc9Zp_M'
                }
            }"
            id="pre-license-bundles"
        />

        <SpaceFeatures
            :config="{
                features: {
                    items: [{
                        description: 'Interested in purchasing individual TREC-approved pre-license courses? [Click here](/courses/texas/pre-license/individual-courses/)'
                    }, {
                        description: 'Want to pay as you go? Call us at **855-637-1886** to learn more.'
                    }]
                },
                space: {
                    wrapperExtensionClasses: 'bg-light py-3'
                },
                title: {
                    show: false
                }
            }"
            config-key="spaces.messaging"
            id="messaging"
        />

        <SpaceTrustpilot />

        <SpaceFeatures />

        <SpaceBundleCardCollection
            config-key="spaces.continuing_education_bundles"
            id="continuing-education-bundles"
            :query="{
                post_type: 'product',
                product_line: 'continuing-education',
                product_type: 'bundle',
                state: 'texas'
            }"
        />

        <SpaceCalloutImage
            :config="{
                image: {
                    src: '/uploads/sites/3/2018/06/devices.png'
                },
                images: {
                    collectionExtensionClasses: 'mt-auto',
                    columnClasses: 'col-12 pb-2',
                    slot: 'body-footer'
                },
                space: {
                    asideClasses: 'col-md-5 col-12',
                    asideExtensionClasses: 'order-1 p-3',
                    bodyFooterClasses: 'col-md-2 col-12',
                    bodyFooterExtensionClasses: 'd-flex order-3',
                    mainClasses: 'col-md-5 col-12',
                    mainExtensionClasses: 'my-auto order-2 p-3',
                    wrapperExtensionClasses: 'bg-light py-3'
                }
            }"
            config-key="spaces.app"
            id="app"
        />

        <SpaceBundleCardCollection
            config-key="spaces.training_singles"
            id="training-singles"
            :query="{
                post_type: 'product',
                product_line: 'training'
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
