<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyLogo from "@core/components/diy/logo.vue";
import DiyNav from "@core/components/diy/nav.vue";
import DiySpace from "@core/components/diy/space.vue";

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
                    items: [
                        {
                            itemExtensionClasses: "d-none",
                            href: "#",
                            icon: {
                                icon: "bars"
                            },
                            title: "Menu"
                        }
                    ],
                    slot: "left"
                },
                logo: {
                    desktopSrc:
                        "/uploads/sites/3/2018/05/aceable-logo-white.png",
                    mobileSrc:
                        "/uploads/sites/3/2018/05/aceable-logomark-white.png",
                    slot: "center",
                    type: "span"
                },
                nav: {
                    slot: "body-header"
                },
                right: {
                    inline: true,
                    items: [
                        {
                            content: "Sign-in",
                            href: process.env.ACEABLE_WEB_APP,
                            icon: {
                                icon: "sign-in",
                                show: true
                            }
                        }
                    ],
                    listExtensionClasses: "font-size-sm mb-0",
                    itemsShowBefore: true,
                    slot: "right"
                },
                space: {
                    wrapperExtensionClasses: "bg-dark py-3"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceNav",

    props: {
        configKey: {
            default: "nav",
            type: String
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
