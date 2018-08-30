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
                left: this.left,
                logo: this.logo,
                nav: this.nav,
                right: this.right,
                space: this.space
            };
        }
    },

    mixins: [prefab],

    name: "SpaceNav",

    props: {
        configKey: {
            default: "spaces.nav",
            type: String
        },

        left: {
            default() {
                return {
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
                };
            },
            type: Object
        },

        logo: {
            default() {
                return {
                    desktopSrc: "/manual/brand/ace-color-logo.png",
                    mobileSrc: "/manual/brand/ace-color-logo.png",
                    slot: "left",
                    type: "span"
                };
            },
            type: Object
        },

        nav: {
            default() {
                return {
                    slot: "body-header"
                };
            },
            type: Object
        },

        right: {
            default() {
                return {
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
                };
            },
            type: Object
        },

        space: {
            default() {
                return {
                    wrapperExtensionClasses: "bg-white py-3"
                };
            },
            type: Object
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
