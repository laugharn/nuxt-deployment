<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";

// Prefab
import Callout from "./default.vue";

// Libraries
import merge from "lodash/merge";

export default {
    components: {
        DiyImage
    },

    computed: {
        defaultConfig() {
            return this.extendConfig;
        },

        extendConfig() {
            return merge(this.baseConfig, {
                image: {
                    id: this.id + "-image",
                    params: "w=720&auto=compress",
                    slot: "aside"
                },

                images: {
                    columnClasses: "col-md-4 col-6 pb-2 pt-0",
                    id: this.id + "-images",
                    items: [
                        {
                            src: "/uploads/sites/2/2018/07/app-store.png"
                        },
                        {
                            src: "/uploads/sites/2/2018/07/google-play.png"
                        }
                    ],
                    slot: "main-footer"
                }
            });
        }
    },

    extends: Callout
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyHeading v-bind="computedConfig.title" />
        <DiyMarkdown :marked="false" v-bind="computedConfig.description" />
        <DiyCollection v-bind="computedConfig.images" v-if="computedConfig.images.items">
            <DiyImage slot-scope="item" v-bind="item" />
        </DiyCollection>

        <DiyImage v-bind="computedConfig.image" />
    </DiySpace>
</template>
