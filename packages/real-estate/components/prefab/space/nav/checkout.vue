<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyLogo from "@core/components/diy/logo.vue";
import DiyNav from "@core/components/diy/nav.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import get from "lodash/get";
import { mapGetters } from "vuex";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        // DIY
        DiyList,
        DiyLogo,
        DiyNav,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                left: {
                    inline: true,
                    items: [
                        {
                            content: "Continue Shopping",
                            contentClasses: "d-md-flex d-none",
                            href: "/",
                            icon: {
                                icon: "arrow-left",
                                show: true
                            }
                        }
                    ],
                    listExtensionClasses: "font-size-sm mb-0",
                    itemsShowBefore: true,
                    slot: "left"
                },
                logo: {
                    desktopSrc:
                        "/uploads/sites/3/2018/05/logo-lockup-re-white.png",
                    href: "/",
                    mobileSrc:
                        "/uploads/sites/3/2018/05/aceable-logomark-white.png",
                    slot: "center"
                },
                nav: {
                    slot: "body-header"
                },
                right: {
                    inline: true,
                    items: [
                        {
                            content: get(
                                this.$store.state.page.content,
                                "phone_number"
                            ),
                            contentClasses: "d-md-flex d-none",
                            href:
                                "tel:" +
                                get(
                                    this.$store.state.page.content,
                                    "phone_number"
                                ),
                            icon: {
                                icon: "phone",
                                show: true
                            }
                        }
                    ],
                    listExtensionClasses: "font-size-sm mb-0",
                    itemsShowBefore: true,
                    slot: "right"
                },
                space: {
                    sticky: true,
                    wrapperExtensionClasses: "bg-dark py-3"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceNav",

    props: {
        configKey: {
            default: "spaces.nav"
        },

        id: {
            default: "nav"
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyNav v-bind="computedConfig.nav">
            <DiyList v-bind="computedConfig.left" />
            <DiyLogo v-bind="computedConfig.logo" />
            <DiyList v-bind="computedConfig.right" />
        </DiyNav>
    </DiySpace>
</template>
