<script>
// Components
// DIY
import DiyImage from "@core/components/diy/image.vue";

// Prefab
import Callout from "./default.vue";

export default {
    components: {
        DiyImage
    },

    computed: {
        defaultConfig() {
            return this.extendConfig;
        },

        extendConfig() {
            return {
                ...this.baseConfig,
                ...{
                    image: {
                        ...{
                            id: this.id + "-image",
                            params: this.imageParams,
                            show: this.imageShow,
                            slot: this.imageSlot,
                            src: this.imageSrc
                        },
                        ...this.image
                    },
                    seal: {
                        ...{
                            id: this.id + "-seal",
                            params: this.sealParams,
                            show: this.sealShow,
                            slot: this.sealSlot,
                            src: this.sealSrc
                        },
                        ...this.seal
                    }
                }
            };
        }
    },

    extends: Callout,

    props: {
        image: {
            default: null,
            type: Object
        },

        imageParams: {
            default: "w=720&auto=compress",
            type: String
        },

        imageShow: {
            default: true,
            type: Boolean
        },

        imageSlot: {
            default: "aside",
            type: String
        },

        imageSrc: {
            default: null,
            type: String
        },
        seal: {
          default: null,
          type: Object
        },
        sealShow: {
          default: true,
          type: Boolean
        },
        sealSlot: {
          default: "main-header",
          type: String
        },
        sealSrc: {
          default: null,
          type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyImage v-bind="computedConfig.seal" :src="computedConfig.seal.sealSrc" height="100px" image-extension-classes="mx-auto pb-4" :remote="true" />
        <DiyMarkdown v-bind="computedConfig.description" />
        <DiyCollection v-bind="computedConfig.buttons" v-if="computedConfig.buttons.items">
            <DiyButton :block="computedConfig.buttons.block" :button-extension-classes="item.buttonExtensionClasses || computedConfig.buttons.buttonExtensionClasses" @click.prevent="item.handleClick || $store.dispatch('page/goTo', item.href)" slot-scope="item" v-bind="item" />
        </DiyCollection>
        <DiyImage v-bind="computedConfig.image" />

    </DiySpace>
</template>
