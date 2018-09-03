<script>
// Components
import DiyList from "@core/components/diy/list.vue";
import DiyMarkdown from "@core/components/diy/markdown.vue";
import DiySpace from "@core/components/diy/space.vue";

// Content
import menuItems from "~/assets/js/content/nav";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyList,
        DiyMarkdown,
        DiySpace
    },

    computed: {
        defaultConfig() {
            return {
                address: {
                    id: this.id + "-address",
                    inline: true,
                    items: [
                        {
                            content: "610 WEST 5TH ST, STE 603",
                            showIcon: false
                        },
                        {
                            content: "AUSTIN, TX 78701",
                            showIcon: false
                        }
                    ],
                    slot: "body-header"
                },

                copyright: {
                    content: "©2018 Aceable, Inc. All rights reserved.",
                    id: this.id + "-copyright",
                    slot: "body-footer"
                },

                disclaimer: {
                    id: this.id + "-disclaimer",
                    slot: "body-footer"
                },

                menu: {
                    id: this.id + "-menu",
                    inline: true,
                    items: [
                        ...menuItems,
                        {
                            content: "Terms & Conditions",
                            href: "/terms-and-conditions/"
                        },
                        { content: "Privacy Policy", href: "/privacy-policy/" }
                    ],
                    slot: "body-header"
                },

                social: {
                    id: this.id + "-social",
                    inline: true,
                    items: [
                        {
                            href: "https://twitter.com/aceableagent",
                            icon: {
                                icon: "twitter",
                                show: true,
                                type: "fab"
                            }
                        },
                        {
                            href: "https://www.facebook.com/AceableAgent/",
                            icon: {
                                icon: "facebook",
                                show: true,
                                type: "fab"
                            }
                        },
                        {
                            href: "https://www.instagram.com/aceableagent/",
                            icon: {
                                icon: "instagram",
                                show: true,
                                type: "fab"
                            }
                        },
                        {
                            href:
                                "https://www.linkedin.com/showcase/aceableagent/",
                            icon: {
                                icon: "linkedin",
                                show: true,
                                type: "fab"
                            }
                        },
                        {
                            href:
                                "https://www.youtube.com/channel/UC5JBaTSOw3cQY54xsW_Dclw",
                            icon: {
                                icon: "youtube",
                                show: true,
                                type: "fab"
                            }
                        }
                    ],
                    itemsShowBefore: true,
                    slot: "body-header"
                },

                space: {
                    id: this.id,
                    wrapperClasses: "Space__wrapper --footer",
                    wrapperExtensionClasses:
                        "bg-dark font-size-sm py-5 text-center text-white"
                }
            };
        }
    },

    mixins: [prefab],

    name: "SpaceFooter",

    props: {
        configKey: {
            default: "spaces.footer"
        },

        id: {
            default: "footer",
            type: String
        }
    }
};
</script>

<template>
    <DiySpace v-bind="computedConfig.space">
        <DiyList v-bind="computedConfig.menu" />
        <DiyList v-bind="computedConfig.address" />
        <DiyList v-bind="computedConfig.social" />
        <DiyMarkdown v-bind="computedConfig.disclaimer" />
        <DiyMarkdown v-bind="computedConfig.copyright" />
    </DiySpace>
</template>
