<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyImage
    },

    computed: {
        baseConfig() {
            return {
                images: [
                    "/uploads/sites/3/2018/07/stripe.png",
                    "/uploads/sites/2/2018/08/paypal.png",
                    "/uploads/sites/3/2018/07/letsencrypt.png",
                    "/uploads/sites/3/2018/07/trustpilot.png",
                    "/uploads/sites/3/2018/07/chamber.png"
                ]
            };
        },

        defaultConfig() {
            return this.baseConfig;
        }
    },

    mixins: [prefab]
};
</script>

<template>
    <div class="row">
        <div class="col" :key="index" v-for="(img, index) in computedConfig.images">
            <DiyImage :src="img" />
        </div>
    </div>
</template>
