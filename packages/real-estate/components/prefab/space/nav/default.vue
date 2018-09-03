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
                    id: this.id + "-left",
                    inline: true,
                    items: [
                        {
                            content: "Menu",
                            contentClasses: "d-none",
                            event: () => {
                                this.$store.commit("page/toggleMenu");
                            },
                            icon: {
                                icon: "bars",
                                show: true
                            },
                            itemExtensionClasses: "d-md-none",
                            href: "#"
                        },
                        {
                            content: get(
                                this.$store.state.page.content,
                                "phone_number",
                                this.phoneNumber
                            ),
                            contentClasses: "d-md-flex d-none",
                            href:
                                "tel:" +
                                get(
                                    this.$store.state.page.content,
                                    "phone_number",
                                    this.phoneNumber
                                ),
                            icon: {
                                icon: "phone",
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
                    id: this.id + "-logo",
                    mobileSrc:
                        "/uploads/sites/3/2018/05/aceable-logomark-white.png",
                    slot: "center"
                },
                nav: {
                    id: this.id + "-nav",
                    slot: "body-header"
                },
                right: {
                    id: this.id + "-right",
                    inline: true,
                    items: [
                        {
                            badge: {
                                badgeExtensionClasses:
                                    "badge-pill badge-convert text-white",
                                show: true
                            },
                            content: "Cart",
                            contentClasses: "d-md-flex d-none",
                            event: () => {
                                this.$store.commit("page/toggleCart");
                            },
                            href: "#",
                            icon: {
                                icon: "shopping-cart",
                                show: true
                            },
                            showAfter: true
                        },
                        {
                            content: "Sign-in",
                            contentClasses: "d-md-flex d-none",
                            href: "https://app.aceable.com/user/signin",
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
                    id: this.id,
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
        },

        phoneNumber: {
            default: "855-637-1886",
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
