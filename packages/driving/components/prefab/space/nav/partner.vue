<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyLogo from "@core/components/diy/logo.vue";
import DiyNav from "@core/components/diy/nav.vue";
import DiySpace from "@core/components/diy/space.vue";

// Libraries
import get from "lodash/get";

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
                logo: this.logo,
                nav: this.nav,
                partner: this.partner,
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

        id: {
            default: "nav",
            type: String
        },

        logo: {
            default() {
                return {
                    desktopSrc: "/manual/brand/ace-color-logo.svg",
                    mobileSrc: "/manual/brand/ace-color-logo.svg",
                    slot: "left",
                    type: "span"
                };
            },
            type: Object
        },

        nav: {
            default() {
                return {
                    slot: "body-header",
                    showCenterSlot: false,
                    navExtensionClasses:
                        "d-md-flex d-sm-block justify-content-between",
                    rightSlotClasses:
                        "Nav__slot w-auto d-md-flex d-sm-none right",
                    leftSlotClasses: "Nav__slot w-auto d-md-flex d-sm-block"
                };
            },
            type: Object
        },
        partner: {
            default: null,
            type: Object
        },

        right: {
            default() {
                return {
                    inline: true,
                    items: [
                        {
                            content: get(
                                this.$store.state.page.content,
                                "phone_number",
                                "281-330-8004"
                            ),
                            contentClasses: "d-md-flex d-none",
                            href:
                                "tel:" +
                                get(
                                    this.$store.state.page.content,
                                    "phone_number",
                                    "tel:2813308004"
                                ),
                            icon: {
                                icon: "phone",
                                show: true
                            }
                        },
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
                    wrapperExtensionClasses: "bg-dark py-3"
                };
            },
            type: Object
        }
    }
};
</script>

<style lang="scss">
@import "~@core/assets/sass/functions";
@import "~@core/assets/sass/variables";
@import "~@core/assets/sass/mixins";

.Nav__slot {
    @include media-breakpoint-down(md) {
        display: block !important;
        text-align: center !important;
        margin: auto !important;
        width: 100% !important;
        img {
            margin: 0 auto $spacer/2 !important;
        }
        &.right {
            display: none !important;
        }
    }
}
</style>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyNav v-bind="computedConfig.nav">
            <DiyLogo v-bind="computedConfig.logo"/>
            <div v-if="partner" slot="left" class="text-white ml-3 my-auto d-sm-block" >in partnership with <strong> {{ partner.title }}</strong></div>
            <DiyList v-bind="computedConfig.right" />
        </DiyNav>

    </DiySpace>
</template>
