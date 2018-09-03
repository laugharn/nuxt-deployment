<script>
import SpaceCalloutImage from "~/components/prefab/space/callout/image.vue";
import SpaceCaptureProduct from "~/components/prefab/space/capture/product.vue";
import SpaceContent from "@core/components/prefab/space/content/default.vue";
import SpaceFeatures from "~/components/prefab/space/features/default.vue";
import SpaceTrustpilot from "~/components/prefab/space/trustpilot/default.vue";

export default {
    components: {
        SpaceCalloutImage,
        SpaceCaptureProduct,
        SpaceContent,
        SpaceFeatures,
        SpaceTrustpilot
    }
};
</script>

<template>
    <div>
        <div class="wrapper bg-brand-to-success pt-3 text-white">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-12 my-auto">
                        <h2 class="h2">You could be closing real estate deals with Lori Horner in as little as 6 weeks</h2>
                        <p>You’re ready for a new career in real estate but you’re nervous about getting started. Sound like you? Now you can get started without the risk with AceableAgent and The Lori Horner Group.</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <img class="img-fluid" src="https://ace.imgix.net/uploads/sites/3/2018/03/house.png?w=720&auto=compress">
                    </div>
                </div>
            </div>
        </div>

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
            config-key="spaces.capture"
            id="capture-product"
        />

        <SpaceFeatures
            config-key="spaces.features"
            space-wrapper-extension-classes="py-3"
        />

        <div class="wrapper bg-dark pt-3 text-white">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <img class="img-fluid" src="https://ace.imgix.net/uploads/sites/2/2018/08/Lori-Horner.png?w=640">
                    </div>
                    <div class="col-md-8 col-12 my-auto">
                        <h2 class="h2">Why work with Lori Horner</h2>
                        <p>Lori Horner is a trusted broker and advisor for some of Amarillo’s top buyers and sellers. She and her team are looking for talented agents to join their team and take on their ever-growing demand. Come be part of a brokerage that has sold over $1 billion in real estate.</p>
                    </div>
                </div>
            </div>
        </div>

        <SpaceFeatures
            config-key="spaces.additional_features"
            space-wrapper-extension-classes="py-3"
        />

        <SpaceFeatures
            config-key="spaces.works"
        />

        <div class="wrapper bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2 class="h2">How to get my license</h2>
                        <p>Below is an overview of all the steps needed to get your license. For now, you’ll just need to verify step 1 and sign up to get started on your pre-license coursework with AceableAgent. We’ll help guide you through the rest of the process from there.</p>
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/check-eligibilty.png?auto=compress">
                        Check your eligibility with the Texas Real Estate Commission (TREC)
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/sign-up.png?auto=compress">
                        Get started with AceableAgent’s pre-license course for $297
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/signup.png?auto=compress">
                        Complete all 180 hours of coursework
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/emailcourse.png?auto=compress">
                        Sign up for a TREC account and apply online
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/wait.png?auto=compress">
                        Wait for your eligibility letter and study for the final exam
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/bg-check.png?auto=compress">
                        Complete a background check and schedule your exam
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/ace-the-test.png?auto=compress">
                        Ace the Texas real estate exam with AceableAgent’s test prep program
                    </div>
                    <div class="col-md-3 col-6 py-2">
                        <img class="img-fluid mb-3" src="https://ace.imgix.net/uploads/sites/3/2018/03/close-deals.png?auto=compress">
                        Get started closing deals with Lori Horner
                    </div>
                </div>
            </div>
        </div>

        <SpaceTrustpilot />

        <SpaceContent
            config-key="spaces.content"
        />
    </div>
</template>
