<script>
// Components
// DIY
import DiyImage from "../../../diy/image.vue";
import DiySpace from "../../../diy/space.vue";

// Mixins
import prefab from "../../../mixins/prefab";

export default {
    components: {
        DiyImage,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                image: {
                    backgroundWrapperExtensionClasses: "aspect-ratio-5by1",
                    id: this.id + "-image",
                    params: "w=1440&auto=compress",
                    src:
                        this.$store.state.page.content.image ||
                        "/uploads/content/k7JdmEL3jlLJVzzaBlCzdDLx9XNl6C9u.jpg",
                    type: "background"
                },

                space: {
                    id: this.id,
                    wrapperExtensionClasses: "p-0"
                }
            };
        }
    },

    mixins: [prefab],

    props: {
        configKey: {
            default: "spaces.banner",
            type: String
        },

        id: {
            default: "banner",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyImage v-bind="computedConfig.image" />
    </DiySpace>
</template>
