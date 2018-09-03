<script>
// Components
// DIY
import DiyList from "@core/components/diy/list.vue";

// Libraries
import store from "store";

// Mixins
import prefab from "@core/components/mixins/prefab";

export default {
    components: {
        DiyList
    },

    computed: {
        baseConfig() {
            return {
                list: {
                    inline: true,
                    itemsInnerExtensionClasses: "text-white font-size-lg",
                    listExtensionClasses: "mb-0"
                }
            };
        },

        computedConfig() {
            return this.baseConfig;
        },

        items() {
            let items = [
                {
                    href:
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                        encodeURI(location.href),
                    icon: {
                        icon: "facebook",
                        type: "fab"
                    },
                    showBefore: true
                },
                {
                    href:
                        "https://twitter.com/intent/tweet/?url=" +
                        encodeURI(location.href),
                    icon: {
                        icon: "twitter",
                        type: "fab"
                    },
                    showBefore: true
                },
                {
                    href:
                        "https://www.linkedin.com/shareArticle?mini=true&url=" +
                        encodeURI(location.href),
                    icon: {
                        icon: "linkedin",
                        type: "fab"
                    },
                    showBefore: true
                },
                {
                    href: "#",
                    icon: {
                        icon: "envelope"
                    },
                    showBefore: true
                }
            ];

            if (this.showDownload) {
                items.push({
                    href: this.$store.state.page.content.download_path,
                    icon: {
                        icon: "download"
                    },
                    showBefore: true
                });
            }

            return items;
        }
    },

    data() {
        return {
            loading: true,
            showDownload: false
        };
    },

    mixins: [prefab],

    mounted() {
        let signedUp = store.get(
            "whitepaper-" + this.$store.state.page.content.post_name
        );

        if (signedUp && this.$store.state.page.content.download_path) {
            this.showDownload = true;
        }

        this.loading = false;

        this.$nuxt.$on(this.$store.state.page.content.post_name, () => {
            this.showDownload = true;
        });
    }
};
</script>

<template>
    <DiyList :items="items" v-bind="computedConfig.list" v-if="!loading">
    </DiyList>
</template>
