<script>
import Intake from "~/components/custom/intake/default.vue";
import SpaceBreadcrumbs from "~/components/prefab/space/breadcrumbs/default.vue";
import SpaceButton from "~/components/prefab/space/button/default.vue";
import SpaceCalloutButtons from "~/components/prefab/space/callout/buttons.vue";
import SpaceHeroTitleText from "~/components/prefab/space/hero/title-text.vue";
import SpaceCalloutImageList from "~/components/prefab/space/callout/image-list.vue";
import SpaceCalloutYoutubeQuote from "~/components/prefab/space/callout/youtube-quote.vue";
import SpaceCaptureGuide from "~/components/prefab/space/capture/guide.vue";
import SpaceCaptureProductText from "~/components/prefab/space/capture/product-text.vue";
import SpaceCompareSchool from "~/components/custom/landing-page/compare-school.vue";
import SpaceGuaranteeSeal from "~/components/prefab/space/callout/guarantee-seal.vue";
import SpaceTestimonials from "~/components/prefab/space/testimonials/default.vue"
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
        SpaceHeroTitleText,
        SpaceCalloutImageList,
        SpaceCalloutYoutubeQuote,
        SpaceCaptureGuide,
        SpaceCaptureProductText,
        SpaceCompareSchool,
        SpaceGuaranteeSeal,
        SpaceTestimonials,
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
        <SpaceHeroTitleText />
        <SpaceCaptureProductText
          :config="{
              space: {
                  asideExtensionClasses: 'd-none',
              }
          }"
          configKey="spaces.product_callout"
          id="capture-product-text"
        />

        <SpaceCompareSchool />
        <SpaceTestimonials />
        <Intake
            :form-list-id="94171"
        />

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

        <SpaceGuaranteeSeal />

        <SpaceTrial />

        <SpaceCalloutYoutubeQuote />

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

<style lang="scss">
#features-wrapper {
  background-color: #F0F5FA;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.guarantee-seal {
  margin-top: 40px;
  background-color: #21333f;
    .guarantee-seal__title {
      color: white;
    }
    .guarantee-seal__description {
      color: white;
    }
}

</style>
